LIB_TS = ./tc
LIB_TEST = ./tests
FILE = lab6

all:
	@echo "Converting lab6.ts to lab6.js"
	@rm -f $(LIB_TS)/tsconfig.json
	@tsc $(LIB_TS)/$(FILE).ts --target es6 --module commonjs --esModuleInterop --skipLibCheck
	@cd $(LIB_TS) && node $(FILE).js

test:
	@echo "Running tests for lab6"
	@cd $(LIB_TEST) && npm test -- --watch=false

run: all test

clean:
	rm -rf ./test-results
	rm -f $(LIB_TS)/*.js  $(LIB_TS)/output.json