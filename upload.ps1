param(
    [Parameter(Mandatory=$true)]
    [string]$FilePath,
    [Parameter(Mandatory=$true)]
    [string]$RepoPath
)

$basedir = "C:\Users\mathp\Downloads\restaurant-au-rendez-vous"
$fullPath = Join-Path $basedir $FilePath

if (-not (Test-Path $fullPath)) {
    Write-Error "File not found: $fullPath"
    exit 1
}

# Check if file is binary or text
$ext = [IO.Path]::GetExtension($fullPath).ToLower()
$binaryExts = @('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.webp')

if ($binaryExts -contains $ext) {
    $bytes = [IO.File]::ReadAllBytes($fullPath)
    $encoded = [Convert]::ToBase64String($bytes)
} else {
    $text = Get-Content -Raw -LiteralPath $fullPath
    $encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($text))
}

# Create JSON payload
$payload = @{
    message = "Add $FilePath"
    content = $encoded
} | ConvertTo-Json -Compress

# Write to temp file
$tmpFile = [IO.Path]::GetTempFileName()
$payload | Set-Content -LiteralPath $tmpFile -Encoding ASCII

$result = gh api "repos/mathpier3-tech/Au-rendez-vous/contents/$RepoPath" -X PUT --input $tmpFile 2>&1

Remove-Item -LiteralPath $tmpFile -Force

if ($LASTEXITCODE -eq 0) {
    $name = $result | ConvertFrom-Json | Select-Object -ExpandProperty content | Select-Object -ExpandProperty name
    Write-Host "OK: $name"
} else {
    Write-Host "FAIL: $FilePath"
    Write-Host $result
}
