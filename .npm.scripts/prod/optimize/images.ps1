# to be executed in powershell mode
$NewDesiredPath = "$($env:Path);C:\jbl_vbox\install\"
Write-Host $NewDesiredPath
[Environment]::SetEnvironmentVariable( "Path", $NewDesiredPath, "Process" )
Write-Host $env:Path
[Environment]::SetEnvironmentVariable( "Path", $NewDesiredPath, "User" )
[Environment]::SetEnvironmentVariable( "Path", $NewDesiredPath, "Machine" )
Write-Host $env:Path

# git-bash.exe ./npm.scripts/prod/optimize/images.sh
git-bash.exe .\npm.scripts\prod\optimize\images.sh
# git-bash.exe .\npm.scripts\prod\optimize\images.ps1
