module.exports = function (plop) {
  plop.setHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  plop.setHelper("date", function () {
    return new Date(Date.now()).toDateString();
  });

  plop.setGenerator("Preact Component", {
    description: "Create a basic Preact component",
    prompts: [
      {
        type: "input",
        name: "dir",
        message: "Starting from the src dir, enter the path",
      },
      {
        type: "input",
        name: "name",
        message: "Component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{dir}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component.react.js.hbs",
        // templateFile: "plop-templates/Component.preact.js.hbs",
      },
    ],
  });

  plop.setGenerator("Preact Hook", {
    description: "Create a basic Preact hook",
    prompts: [
      {
        type: "input",
        name: "dir",
        message: "Starting from the src/hooks dir, enter the path",
      },
      {
        type: "input",
        name: "name",
        message: "Hook name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/{{dir}}/{{pascalCase name}}.ts",
        templateFile: "plop-templates/Hook.react.js.hbs",
        // templateFile: "plop-templates/Hook.preact.js.hbs",
      },
    ],
  });
};
