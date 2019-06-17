const Auth = {};

Auth.BodyAuth = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string"
    },
    password: {
      type: "string"
    }
  }
};

Auth.BodyLogin = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string"
    },
    password: {
      type: "string"
    }
  }
};

Auth.ParamsGetUser = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

Auth.ParamsPutUser = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

Auth.BodyPutUser = {
  type: "object",
  required: ["email", "password", "displayName", "username"],
  properties: {
    email: {
      type: "string"
    },
    password: {
      type: "string"
    },
    displayName: {
      type: "string"
    },
    username: {
      type: "string"
    }
  }
};

Auth.ParamsValidateUser = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

Auth.ParamsDeleteUser = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

module.exports = Auth;
