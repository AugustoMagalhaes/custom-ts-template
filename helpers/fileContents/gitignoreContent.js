const gitignoreContent = `# npm
node_modules
package-lock.json
*.log
*.gz

# Coveralls
.nyc_output
coverage

# Benchmarking
benchmarks/graphs

# environment variables
.env

# thunder-client logs
thunder*

# ignore additional files using core.excludesFile
# https://git-scm.com/docs/gitignore`;

export default gitignoreContent;
