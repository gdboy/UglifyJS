do_not_update_lhs: {
    options = {
        global_defs: {
            DEBUG: 0,
        },
    }
    input: {
        DEBUG++;
        DEBUG += 1;
        DEBUG = 1;
    }
    expect: {
        DEBUG++;
        DEBUG += 1;
        DEBUG = 1;
    }
}

do_update_rhs: {
    options = {
        global_defs: {
            DEBUG: 0,
        },
    }
    input: {
        MY_DEBUG = DEBUG;
        MY_DEBUG += DEBUG;
    }
    expect: {
        MY_DEBUG = 0;
        MY_DEBUG += 0;
    }
}

mixed: {
    options = {
        evaluate: true,
        global_defs: {
            DEBUG: 0,
            ENV: 1,
            FOO: 2,
        },
    }
    input: {
        var ENV = 3;
        var FOO = 4;
        f(ENV * 10);
        --FOO;
        DEBUG = 1;
        DEBUG++;
        DEBUG += 1;
        f(DEBUG);
        x = DEBUG;
    }
    expect: {
        var ENV = 3;
        var FOO = 4;
        f(10);
        --FOO;
        DEBUG = 1;
        DEBUG++;
        DEBUG += 1;
        f(0);
        x = 0;
    }
    expect_warnings: [
        "WARN: global_defs ENV redefined [test/compress/issue-208.js:1,12]",
        "WARN: global_defs FOO redefined [test/compress/issue-208.js:2,12]",
        "WARN: global_defs FOO redefined [test/compress/issue-208.js:4,10]",
        "WARN: global_defs DEBUG redefined [test/compress/issue-208.js:5,8]",
        "WARN: global_defs DEBUG redefined [test/compress/issue-208.js:6,8]",
        "WARN: global_defs DEBUG redefined [test/compress/issue-208.js:7,8]",
    ]
}
