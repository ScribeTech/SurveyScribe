
    var testsContext = require.context("../../client", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    