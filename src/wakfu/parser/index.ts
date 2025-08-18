import { ParserConstants } from "./constant";

export type WakfuParserOptions = {
  resolveParams?: (paramIndex: number, value: number, params: number[]) => void;
};

export class WakfuParser {
  private static readonly ConditionSigns = ["+", "-", "~"];
  private static readonly ConditionOperators = ["=", "<", ">", "!=", "<=", ">="];
  private options: WakfuParserOptions;
  private params: number[] = [];
  private itemLevel: number = 0;

  public constructor(options: WakfuParserOptions = {}) {
    this.options = options;
  }

  private getConstant(constant: string) {
    return ParserConstants[constant] ?? constant;
  }

  private getExactParamValue(paramIndex: number) {
    const baseValue = this.params[(paramIndex - 1) * 2] || 0;
    const levelScaling = this.params[(paramIndex - 1) * 2 + 1] || 0;
    return levelScaling !== 0 ? baseValue + levelScaling * this.itemLevel : baseValue;
  }

  private getParamValue(paramIndex: number) {
    const baseValue = this.params[(paramIndex - 1) * 2] || 0;
    const levelScaling = this.params[(paramIndex - 1) * 2 + 1] || 0;
    return Math.floor(levelScaling !== 0 ? baseValue + levelScaling * this.itemLevel : baseValue);
  }

  private parseVariable(variable: string) {
    if (variable.startsWith("#")) {
      const body = variable.slice(1);
      if (/^\d+$/.test(body)) {
        const paramIndex = parseInt(body, 10);
        const paramValue = this.getParamValue(paramIndex);
        if (this.options.resolveParams) {
          return this.options.resolveParams(paramIndex, paramValue, this.params);
        } else {
          return String(paramValue);
        }
      }
      return `[${variable}]`;
    }
    return this.getConstant(variable);
  }

  private parseCondition(condition: string): boolean {
    const match = condition.match(/^([+\-~]?)(\d*)\s*([=<>!]+)?\s*(\d+)?$/);
    if (match === null) {
      return false;
    }
    const [, sign, left, op, right] = match;
    if (!WakfuParser.ConditionSigns.includes(sign) && !WakfuParser.ConditionOperators.includes(op)) {
      return false;
    }
    if (op) {
      const leftValue = left ? this.getParamValue(Number(left)) : this.getParamValue(Number(right));
      const rightValue = left ? Number(right) : 1;
      switch (op) {
        case "=":
          return leftValue === rightValue;
        case "<":
          return leftValue < rightValue;
        case ">":
          return leftValue > rightValue;
        case "!=":
          return leftValue !== rightValue;
        case "<=":
          return leftValue <= rightValue;
        case ">=":
          return leftValue >= rightValue;
      }
    } else {
      const leftValue = Number(left);
      const paramValue = this.getParamValue(leftValue);
      switch (sign) {
        case "+":
          return paramValue > 0;
        case "-":
          return paramValue < 0;
        case "~":
          return this.params.length >= leftValue * 2;
      }
    }
    return false;
  }

  private parseConditionBlock(conditionBlock: string) {
    const conditionMatch = conditionBlock.match(/^\s*\[([^\]]+)\]\?/);
    if (conditionMatch === null) {
      return this.parseBlock(conditionBlock);
    }
    const conditionExpression = conditionMatch[1];
    const rest = conditionBlock.slice(conditionMatch[0].length);
    let depth = 0;
    let split = -1;
    let cursor = 0;
    while (cursor < rest.length && split === -1) {
      if (rest[cursor] === "{" && rest[cursor - 1] !== "//") {
        ++depth;
      } else if (rest[cursor] === "}" && rest[cursor - 1] !== "//") {
        --depth;
      } else if (rest[cursor] === ":" && rest[cursor - 1] !== "//" && depth === 0) {
        split = cursor;
        break;
      }
      cursor++;
    }
    const conditionResult = this.parseCondition(conditionExpression);
    if (split === -1) {
      if (conditionResult) {
        return this.parseBlock(rest);
      }
    }
    const thenBlock = rest.slice(0, split);
    const elseBlock = rest.slice(split + 1);
    return conditionResult ? this.parseBlock(thenBlock) : this.parseBlock(elseBlock);
  }

  private parseOperation(operation: string) {
    const match = operation.match(/\[#(\d+)[.\d]+\]([*+\-/])(\d+)/);
    if (match === null) {
      return operation;
    }
    const [, paramIndex, operationType, operand] = match;
    const paramValue = this.getExactParamValue(Number(paramIndex));
    switch (operationType) {
      case "*":
        return String(Math.floor(paramValue * Number(operand)));
      case "+":
        return String(Math.floor(paramValue + Number(operand)));
      case "-":
        return String(Math.floor(paramValue - Number(operand)));
      case "/":
        return String(Math.floor(paramValue / Number(operand)));
    }
  }

  private parseBlock(input: string): string {
    let cursor = 0;
    let output = "";
    while (cursor < input.length) {
      const currentChar = input[cursor];
      switch (currentChar) {
        /** Handle escape character */
        case "\\": {
          output += input[cursor + 1];
          cursor += 2;
          break;
        }
        /** Handle operations */
        case "|": {
          const cursorEnd = input.indexOf("|", cursor + 1);
          if (cursorEnd === -1) {
            output += input.slice(cursor);
            return output;
          }
          const operation = input.slice(cursor + 1, cursorEnd);
          output += this.parseOperation(operation);
          cursor = cursorEnd + 1;
          break;
        }
        /** Handle variable */
        case "[": {
          const cursorEnd = input.indexOf("]", cursor);
          if (cursorEnd === -1) {
            output += input.slice(cursor);
            return output;
          }
          const variable = input.slice(cursor + 1, cursorEnd);
          output += this.parseVariable(variable);
          cursor = cursorEnd + 1;
          break;
        }
        /** Handle condition block */
        case "{": {
          let depth = 1;
          let tempCursor = cursor + 1;
          while (tempCursor < input.length && depth > 0) {
            if (input[tempCursor] === "{" && input[tempCursor - 1] !== "\\") {
              depth++;
            } else if (input[tempCursor] === "}" && input[tempCursor - 1] !== "\\") {
              depth--;
            }
            tempCursor++;
          }
          if (depth !== 0) {
            output += input.slice(cursor);
            return output;
          }
          const conditionBlock = input.slice(cursor + 1, tempCursor - 1);
          output += this.parseConditionBlock(conditionBlock);
          cursor = tempCursor;
          continue;
        }
        default: {
          output += currentChar;
          ++cursor;
        }
      }
    }
    return output;
  }

  public parse(template: string, params: number[], itemLevel: number = 0) {
    this.params = params;
    this.itemLevel = itemLevel;
    return this.parseBlock(template).replace(/\s%/g, "%");
  }
}
