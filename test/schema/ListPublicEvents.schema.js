const listPublicEventsSchema = {
  title: 'list public events schema',
  type: 'array',
  required: ['id', 'type', 'actor', 'repo', 'payload', 'public', 'created_at'],
  properties: {
    id: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    actor: {
      type: 'object',
      required: ['id', 'login', 'display_login', 'gravatar_id', 'url', 'avatar_url'],
      properties: {
        id: {
          type: 'integer'
        },
        login: {
          type: 'string'
        },
        display_login: {
          type: 'string'
        },
        gravatar_id: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        avatar_url: {
          type: 'string'
        }
      }
    },
    repo: {
      type: 'object',
      required: ['id', 'name', 'url'],
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        url: {
          type: 'string'
        }
      }
    },
    payload: {
      type: 'object',
      properties: {
        push_id: {
          type: 'integer'
        },
        size: {
          type: 'integer'
        },
        distinct_size: {
          type: 'integer'
        },
        ref: {
          type: 'string'
        },
        head: {
          type: 'string'
        },
        before: {
          type: 'string'
        },
        commits: {
          type: 'array'
        },
        ref_type: {
          type: 'string'
        },
        master_branch: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        pusher_type: {
          type: 'string'
        },
        action: {
          type: 'action'
        },
        issue: {
          type: 'array'
        },
        comment: {
          type: 'array'
        }
      }
    },
    public: {
      type: 'boolean'
    },
    created_at: {
      type: 'string'
    },
    org: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        login: {
          type: 'string'
        },
        gravatar_id: {
          type: 'string'
        },
        url: {
          type: 'string'
        },
        avatar_url: {
          type: 'string'
        }
      }
    }
  }
};

exports.listPublicEventsSchema = listPublicEventsSchema;
