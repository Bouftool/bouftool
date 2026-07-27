#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
project_root=$(cd -- "${script_dir}/../.." && pwd -P)
package_version=$(node -p "require('${project_root}/package.json').version")
artifact="${project_root}/out/make/arch/bouftool-${package_version}-1-x86_64.pkg.tar.zst"

validate_elf_dependencies() {
  local elf_path=$1
  local ldd_output

  if ! ldd_output=$(LD_LIBRARY_PATH="${extract_root}/opt/bouftool" ldd "${elf_path}" 2>&1); then
    printf '%s\n' "${ldd_output}" >&2
    exit 1
  fi
  if rg -q 'not found' <<<"${ldd_output}"; then
    printf '%s\n' "${ldd_output}" >&2
    printf 'Packaged Electron runtime file has unresolved libraries: %s\n' \
      "${elf_path}" >&2
    exit 1
  fi
}

cd -- "${project_root}"
if test "${BOUFTOOL_SKIP_ARCH_BUILD:-0}" != "1"; then
  yarn make:arch
fi

test -f "${artifact}"
pacman -Qip "${artifact}" >/dev/null

extract_root=$(mktemp -d)
trap 'rm -rf -- "${extract_root}"' EXIT
bsdtar -xf "${artifact}" -C "${extract_root}"

test "$(stat -c '%a' "${extract_root}/opt/bouftool")" = "755"
test -x "${extract_root}/opt/bouftool/bouftool"
test -x "${extract_root}/opt/bouftool/chrome_crashpad_handler"
test -f "${extract_root}/opt/bouftool/resources/app.asar"
test "$(readlink "${extract_root}/usr/bin/bouftool")" = "/opt/bouftool/bouftool"
test -f "${extract_root}/usr/share/applications/bouftool.desktop"
test -f "${extract_root}/usr/share/icons/hicolor/256x256/apps/bouftool.png"
test -f "${extract_root}/usr/share/licenses/bouftool/LICENSE"

main_process_bundle="${extract_root}/main.js"
node -e \
  'const { extractFile } = require("@electron/asar"); process.stdout.write(extractFile(process.argv[1], ".vite/build/main.js"));' \
  "${extract_root}/opt/bouftool/resources/app.asar" >"${main_process_bundle}"
if rg -Fq 'Calling `require` for' "${main_process_bundle}"; then
  printf 'Packaged Electron main process contains Rolldown runtime require failures.\n' >&2
  exit 1
fi

if ! desktop_validation=$(desktop-file-validate \
  "${extract_root}/usr/share/applications/bouftool.desktop" 2>&1); then
  printf '%s\n' "${desktop_validation}" >&2
  exit 1
fi
if test -n "${desktop_validation}"; then
  printf '%s\n' "${desktop_validation}" >&2
  exit 1
fi

if ! cmp -s \
  "${project_root}/out/bouftool-linux-x64/bouftool" \
  "${extract_root}/opt/bouftool/bouftool"; then
  printf 'Packaged Electron binary differs from the Forge output.\n' >&2
  exit 1
fi

runtime_files=(
  'bouftool'
  'chrome_crashpad_handler'
  'libEGL.so'
  'libGLESv2.so'
  'libvk_swiftshader.so'
  'libvulkan.so.1'
)
for runtime_file in "${runtime_files[@]}"; do
  runtime_path="${extract_root}/opt/bouftool/${runtime_file}"
  test -f "${runtime_path}"
  validate_elf_dependencies "${runtime_path}"
done

printf 'Arch package verified: %s\n' "${artifact}"
