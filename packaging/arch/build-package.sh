#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
project_root=$(cd -- "${script_dir}/../.." && pwd -P)
bundle_dir="${project_root}/out/bouftool-linux-x64"
artifact_dir="${project_root}/out/make/arch"

fail() {
  printf 'error: %s\n' "$1" >&2
  exit 1
}

test "$(uname -s)" = "Linux" || fail "Arch packaging is supported only on Linux"
test "$(uname -m)" = "x86_64" || fail "Arch packaging currently supports only x86_64"

for command_name in makepkg desktop-file-validate node; do
  command -v "${command_name}" >/dev/null || fail "required command not found: ${command_name}"
done

project_version=$(node -p "require('${project_root}/package.json').version")
pkgbuild_version=$(sed -n 's/^pkgver=//p' "${script_dir}/PKGBUILD")
test -n "${pkgbuild_version}" || fail "PKGBUILD does not define pkgver"
test "${project_version}" = "${pkgbuild_version}" || \
  fail "package.json version ${project_version} does not match PKGBUILD ${pkgbuild_version}"

test -x "${bundle_dir}/bouftool" || fail "Forge bundle executable not found: ${bundle_dir}/bouftool"
test -f "${bundle_dir}/resources/app.asar" || \
  fail "Forge app archive not found: ${bundle_dir}/resources/app.asar"
test -f "${project_root}/public/BouftoolIcon_256.png" || fail "Bouftool icon not found"
test -f "${project_root}/LICENSE" || fail "Bouftool license not found"

desktop-file-validate "${script_dir}/bouftool.desktop"

stage_dir=$(mktemp -d)
trap 'rm -rf -- "${stage_dir}"' EXIT

cp -- "${script_dir}/PKGBUILD" "${stage_dir}/PKGBUILD"
cp -- "${script_dir}/bouftool.desktop" "${stage_dir}/bouftool.desktop"
cp -- "${project_root}/public/BouftoolIcon_256.png" "${stage_dir}/bouftool.png"
cp -- "${project_root}/LICENSE" "${stage_dir}/LICENSE"
mkdir -p -- "${artifact_dir}"

(
  cd -- "${stage_dir}"
  BOUFTOOL_BUNDLE_DIR="${bundle_dir}" PKGDEST="${artifact_dir}" \
    makepkg --force --clean
)

artifact="${artifact_dir}/bouftool-${project_version}-1-x86_64.pkg.tar.zst"
test -f "${artifact}" || fail "expected package was not created: ${artifact}"

printf 'Arch package created: %s\n' "${artifact}"
printf 'Install with: sudo pacman -U "%s"\n' "${artifact}"
