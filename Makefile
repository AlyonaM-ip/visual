LIB_TS = ./tc
LIB_TEST = ./tests
FILE = lib5

all:
	@echo "Converting lab5.ts to lab5.js"
	@tsc $(LIB_TS)/$(FILE).ts 
	@cd $(LIB_TS) && node $(FILE).js

test:
	@echo "Running tests for lab5"
	@cd $(LIB_TEST) && npm test -- --watch=false

run: all test

clean:
	rm -r ./test-results
	rm -f $(LIB_TS)/*.js  $(LIB_TS)/output.json