LIB_TS = ./tc
LIB_TEST = ./tests

all:
	@echo "lab 1 and 2:"
	@tsc $(LIB_TS)/lab1.ts --outDir . && node lab1.js
	@echo "lab 3:"
	@tsc $(LIB_TS)/lab3.ts --outDir . && node lab3.js

test:
	@echo "Running tests for lab1,2 and 3"
	@cd $(LIB_TEST) && npm test -- --watch=false

run: all test

clean:
	rm -rf ./test-results
	rm -f lab*.js