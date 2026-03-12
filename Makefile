LIB_TS = ./tc
LIB_TEST = ./tests

all:
	@echo "Converting lab4.ts to lab4.js"
	@tsc $(LIB_TS)/lab4.ts 
	@cd $(LIB_TS) && node lab4.js

test:
	@echo "Running tests for lab4"
	@cd $(LIB_TEST) && npm test -- --watch=false

run: all test

clean:
	rm -r ./test-results
	rm -f $(LIB_TS)/*.js  $(LIB_TS)/output.json