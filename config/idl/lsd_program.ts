export type LsdProgram = {
  "version": "0.1.0",
  "name": "lsd_program",
  "instructions": [
    {
      "name": "initializeStack",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeStakeManager",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stackFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferStackAdmin",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setStackFeeCommission",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stackFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setPlatformStackFeeCommission",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stackFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addEntrustedStakeManager",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stakeManager",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeEntrustedStakeManager",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stakeManager",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferStakeManagerAdmin",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferBalancer",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newBalancer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setMinStakeAmount",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setUnbondingDuration",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setRateChangeLimit",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rateChangeLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setPlatformFeeCommission",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "protocolFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addValidator",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newValidator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeValidator",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "removeValidator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "reallocStakeManager",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newSize",
          "type": "u32"
        }
      ]
    },
    {
      "name": "redelegate",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "balancer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "toValidator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fromStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splitStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "toStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "redelegateAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnLsdTokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnLsdTokenAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "unstakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "unstakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "unstakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraNew",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraBond",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUnbond",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fromStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splitStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "validator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUpdateActive",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUpdateRate",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stackFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stackFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraMerge",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraWithdraw",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "stack",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "stackFeeCommission",
            "type": "u64"
          },
          {
            "name": "stakeManagersLenLimit",
            "type": "u64"
          },
          {
            "name": "entrustedStakeManagers",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "stakeManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "balancer",
            "type": "publicKey"
          },
          {
            "name": "stack",
            "type": "publicKey"
          },
          {
            "name": "lsdTokenMint",
            "type": "publicKey"
          },
          {
            "name": "poolSeedBump",
            "type": "u8"
          },
          {
            "name": "rentExemptForPoolAcc",
            "type": "u64"
          },
          {
            "name": "minStakeAmount",
            "type": "u64"
          },
          {
            "name": "platformFeeCommission",
            "type": "u64"
          },
          {
            "name": "stackFeeCommission",
            "type": "u64"
          },
          {
            "name": "rateChangeLimit",
            "type": "u64"
          },
          {
            "name": "stakeAccountsLenLimit",
            "type": "u64"
          },
          {
            "name": "splitAccountsLenLimit",
            "type": "u64"
          },
          {
            "name": "unbondingDuration",
            "type": "u64"
          },
          {
            "name": "latestEra",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          },
          {
            "name": "eraBond",
            "type": "u64"
          },
          {
            "name": "eraUnbond",
            "type": "u64"
          },
          {
            "name": "active",
            "type": "u64"
          },
          {
            "name": "totalPlatformFee",
            "type": "u64"
          },
          {
            "name": "validators",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "stakeAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "splitAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "eraRates",
            "type": {
              "vec": {
                "defined": "EraRate"
              }
            }
          },
          {
            "name": "eraProcessData",
            "type": {
              "defined": "EraProcessData"
            }
          }
        ]
      }
    },
    {
      "name": "unstakeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeManager",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stackFeeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "EraProcessData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "needBond",
            "type": "u64"
          },
          {
            "name": "needUnbond",
            "type": "u64"
          },
          {
            "name": "oldActive",
            "type": "u64"
          },
          {
            "name": "newActive",
            "type": "u64"
          },
          {
            "name": "pendingStakeAccounts",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "EraRate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "era",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "EventEraBond",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "bondAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraMerge",
      "fields": [
        {
          "name": "srcStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "dstStakeAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraNew",
      "fields": [
        {
          "name": "newEra",
          "type": "u64",
          "index": false
        },
        {
          "name": "needBond",
          "type": "u64",
          "index": false
        },
        {
          "name": "needUnbond",
          "type": "u64",
          "index": false
        },
        {
          "name": "active",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUnbond",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "fromStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "splitAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unbondAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUpdateActive",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stakeAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUpdateRate",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "platformFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "stackFee",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraWithdraw",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventRedelegate",
      "fields": [
        {
          "name": "fromStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "toStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "redelegateAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventStake",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mintTo",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stakeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "lsdTokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventUnstake",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "burnLsdTokenFrom",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventWithdraw",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAmount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ProgramIdNotMatch",
      "msg": "Program id not match"
    },
    {
      "code": 6001,
      "name": "RemainingAccountsNotMatch",
      "msg": "Remaining accounts not match"
    },
    {
      "code": 6002,
      "name": "AdminNotMatch",
      "msg": "Admin not match"
    },
    {
      "code": 6003,
      "name": "BalancerNotMatch",
      "msg": "Balancer not match"
    },
    {
      "code": 6004,
      "name": "InitializeDataMatch",
      "msg": "Initialize data not match"
    },
    {
      "code": 6005,
      "name": "PlatformFeeRecipientNotMatch",
      "msg": "Platform fee recipient not match"
    },
    {
      "code": 6006,
      "name": "StackFeeRecipientNotMatch",
      "msg": "Stack fee recipient not match"
    },
    {
      "code": 6007,
      "name": "StackNotMatch",
      "msg": "Stack not match"
    },
    {
      "code": 6008,
      "name": "DelegationEmpty",
      "msg": "Delegation empty"
    },
    {
      "code": 6009,
      "name": "StakeAmountTooLow",
      "msg": "Stake amount too low"
    },
    {
      "code": 6010,
      "name": "StakeAccountNotActive",
      "msg": "Stake account not active"
    },
    {
      "code": 6011,
      "name": "StakeAccountActive",
      "msg": "Stake account active"
    },
    {
      "code": 6012,
      "name": "StakeAccountWithLockup",
      "msg": "Stake account with lockup"
    },
    {
      "code": 6013,
      "name": "UnstakeRecipientNotMatch",
      "msg": "Unstake recipient not match"
    },
    {
      "code": 6014,
      "name": "ValidatorNotExist",
      "msg": "Validator not exist"
    },
    {
      "code": 6015,
      "name": "ValidatorAlreadyExist",
      "msg": "Validator already exist"
    },
    {
      "code": 6016,
      "name": "StakeManagerAlreadyExist",
      "msg": "StakeManager already exist"
    },
    {
      "code": 6017,
      "name": "ValidatorNotMatch",
      "msg": "Validator not match"
    },
    {
      "code": 6018,
      "name": "StakeAccountAlreadyExist",
      "msg": "Stake account already exist"
    },
    {
      "code": 6019,
      "name": "SplitStakeAccountAlreadyExist",
      "msg": "Split stake account already exist"
    },
    {
      "code": 6020,
      "name": "StakeAccountNotExist",
      "msg": "Stake account not exist"
    },
    {
      "code": 6021,
      "name": "RentNotEnough",
      "msg": "Rent not enough"
    },
    {
      "code": 6022,
      "name": "BalanceNotEnough",
      "msg": "Balance not enough"
    },
    {
      "code": 6023,
      "name": "CalculationFail",
      "msg": "Calulation fail"
    },
    {
      "code": 6024,
      "name": "AuthorityNotMatch",
      "msg": "Authority not match"
    },
    {
      "code": 6025,
      "name": "EraIsLatest",
      "msg": "Era is latest"
    },
    {
      "code": 6026,
      "name": "EraIsProcessing",
      "msg": "Era is processing"
    },
    {
      "code": 6027,
      "name": "EraIsProcessed",
      "msg": "Era is processed"
    },
    {
      "code": 6028,
      "name": "EraNoNeedBond",
      "msg": "Era no need bond"
    },
    {
      "code": 6029,
      "name": "EraNoNeedUnBond",
      "msg": "Era no need unbond"
    },
    {
      "code": 6030,
      "name": "EraNoNeedUpdateActive",
      "msg": "Era no need update active"
    },
    {
      "code": 6031,
      "name": "EraNoNeedUpdateRate",
      "msg": "Era no need update rate"
    },
    {
      "code": 6032,
      "name": "AmountUnmatch",
      "msg": "Amount unmatch"
    },
    {
      "code": 6033,
      "name": "InvalidUnstakeAccount",
      "msg": "Invalid unstake account"
    },
    {
      "code": 6034,
      "name": "UnstakeAccountNotClaimable",
      "msg": "Unstake account not claimable"
    },
    {
      "code": 6035,
      "name": "UnstakeAccountAmountZero",
      "msg": "Unstake account amount zero"
    },
    {
      "code": 6036,
      "name": "PoolBalanceNotEnough",
      "msg": "Pool balance not enough"
    },
    {
      "code": 6037,
      "name": "UnstakeAmountIsZero",
      "msg": "Unstake amount is zero"
    },
    {
      "code": 6038,
      "name": "ValidatorsNotEqual",
      "msg": "Validators not equal"
    },
    {
      "code": 6039,
      "name": "RateChangeOverLimit",
      "msg": "Rate change over limit"
    },
    {
      "code": 6040,
      "name": "MintAccountNotMatch",
      "msg": "Mint account not match"
    },
    {
      "code": 6041,
      "name": "MintAuthorityNotMatch",
      "msg": "Mint authority not match"
    },
    {
      "code": 6042,
      "name": "FreezeAuthorityNotMatch",
      "msg": "Freeze authority not match"
    },
    {
      "code": 6043,
      "name": "MintSupplyNotEmpty",
      "msg": "Mint supply not empty"
    },
    {
      "code": 6044,
      "name": "MintToOwnerNotMatch",
      "msg": "Mint to owner not match"
    },
    {
      "code": 6045,
      "name": "StakeAccountsLenOverLimit",
      "msg": "Stake accounts len over limit"
    }
  ]
};

export const IDL: LsdProgram = {
  "version": "0.1.0",
  "name": "lsd_program",
  "instructions": [
    {
      "name": "initializeStack",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeStakeManager",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stackFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferStackAdmin",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setStackFeeCommission",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stackFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setPlatformStackFeeCommission",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stackFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addEntrustedStakeManager",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stakeManager",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeEntrustedStakeManager",
      "accounts": [
        {
          "name": "stack",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "stakeManager",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferStakeManagerAdmin",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferBalancer",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newBalancer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setMinStakeAmount",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setUnbondingDuration",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setRateChangeLimit",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rateChangeLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setPlatformFeeCommission",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "protocolFeeCommission",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addValidator",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newValidator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeValidator",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "removeValidator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "reallocStakeManager",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newSize",
          "type": "u32"
        }
      ]
    },
    {
      "name": "redelegate",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "balancer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "toValidator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fromStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splitStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "toStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "redelegateAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnLsdTokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burnLsdTokenAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "unstakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "unstakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "unstakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraNew",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraBond",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUnbond",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fromStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splitStakeAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "validator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUpdateActive",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraUpdateRate",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stack",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lsdTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stackFeeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stackFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraMerge",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "srcStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dstStakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "eraWithdraw",
      "accounts": [
        {
          "name": "stakeManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeHistory",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakeProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "stack",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "stackFeeCommission",
            "type": "u64"
          },
          {
            "name": "stakeManagersLenLimit",
            "type": "u64"
          },
          {
            "name": "entrustedStakeManagers",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "stakeManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "balancer",
            "type": "publicKey"
          },
          {
            "name": "stack",
            "type": "publicKey"
          },
          {
            "name": "lsdTokenMint",
            "type": "publicKey"
          },
          {
            "name": "poolSeedBump",
            "type": "u8"
          },
          {
            "name": "rentExemptForPoolAcc",
            "type": "u64"
          },
          {
            "name": "minStakeAmount",
            "type": "u64"
          },
          {
            "name": "platformFeeCommission",
            "type": "u64"
          },
          {
            "name": "stackFeeCommission",
            "type": "u64"
          },
          {
            "name": "rateChangeLimit",
            "type": "u64"
          },
          {
            "name": "stakeAccountsLenLimit",
            "type": "u64"
          },
          {
            "name": "splitAccountsLenLimit",
            "type": "u64"
          },
          {
            "name": "unbondingDuration",
            "type": "u64"
          },
          {
            "name": "latestEra",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          },
          {
            "name": "eraBond",
            "type": "u64"
          },
          {
            "name": "eraUnbond",
            "type": "u64"
          },
          {
            "name": "active",
            "type": "u64"
          },
          {
            "name": "totalPlatformFee",
            "type": "u64"
          },
          {
            "name": "validators",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "stakeAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "splitAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "eraRates",
            "type": {
              "vec": {
                "defined": "EraRate"
              }
            }
          },
          {
            "name": "eraProcessData",
            "type": {
              "defined": "EraProcessData"
            }
          }
        ]
      }
    },
    {
      "name": "unstakeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeManager",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stackFeeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "EraProcessData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "needBond",
            "type": "u64"
          },
          {
            "name": "needUnbond",
            "type": "u64"
          },
          {
            "name": "oldActive",
            "type": "u64"
          },
          {
            "name": "newActive",
            "type": "u64"
          },
          {
            "name": "pendingStakeAccounts",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "EraRate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "era",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "EventEraBond",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "bondAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraMerge",
      "fields": [
        {
          "name": "srcStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "dstStakeAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraNew",
      "fields": [
        {
          "name": "newEra",
          "type": "u64",
          "index": false
        },
        {
          "name": "needBond",
          "type": "u64",
          "index": false
        },
        {
          "name": "needUnbond",
          "type": "u64",
          "index": false
        },
        {
          "name": "active",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUnbond",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "fromStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "splitAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unbondAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUpdateActive",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stakeAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraUpdateRate",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "platformFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "stackFee",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventEraWithdraw",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "stakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventRedelegate",
      "fields": [
        {
          "name": "fromStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "toStakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "redelegateAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventStake",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mintTo",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "stakeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "lsdTokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventUnstake",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "burnLsdTokenFrom",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EventWithdraw",
      "fields": [
        {
          "name": "era",
          "type": "u64",
          "index": false
        },
        {
          "name": "staker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "unstakeAccount",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAmount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ProgramIdNotMatch",
      "msg": "Program id not match"
    },
    {
      "code": 6001,
      "name": "RemainingAccountsNotMatch",
      "msg": "Remaining accounts not match"
    },
    {
      "code": 6002,
      "name": "AdminNotMatch",
      "msg": "Admin not match"
    },
    {
      "code": 6003,
      "name": "BalancerNotMatch",
      "msg": "Balancer not match"
    },
    {
      "code": 6004,
      "name": "InitializeDataMatch",
      "msg": "Initialize data not match"
    },
    {
      "code": 6005,
      "name": "PlatformFeeRecipientNotMatch",
      "msg": "Platform fee recipient not match"
    },
    {
      "code": 6006,
      "name": "StackFeeRecipientNotMatch",
      "msg": "Stack fee recipient not match"
    },
    {
      "code": 6007,
      "name": "StackNotMatch",
      "msg": "Stack not match"
    },
    {
      "code": 6008,
      "name": "DelegationEmpty",
      "msg": "Delegation empty"
    },
    {
      "code": 6009,
      "name": "StakeAmountTooLow",
      "msg": "Stake amount too low"
    },
    {
      "code": 6010,
      "name": "StakeAccountNotActive",
      "msg": "Stake account not active"
    },
    {
      "code": 6011,
      "name": "StakeAccountActive",
      "msg": "Stake account active"
    },
    {
      "code": 6012,
      "name": "StakeAccountWithLockup",
      "msg": "Stake account with lockup"
    },
    {
      "code": 6013,
      "name": "UnstakeRecipientNotMatch",
      "msg": "Unstake recipient not match"
    },
    {
      "code": 6014,
      "name": "ValidatorNotExist",
      "msg": "Validator not exist"
    },
    {
      "code": 6015,
      "name": "ValidatorAlreadyExist",
      "msg": "Validator already exist"
    },
    {
      "code": 6016,
      "name": "StakeManagerAlreadyExist",
      "msg": "StakeManager already exist"
    },
    {
      "code": 6017,
      "name": "ValidatorNotMatch",
      "msg": "Validator not match"
    },
    {
      "code": 6018,
      "name": "StakeAccountAlreadyExist",
      "msg": "Stake account already exist"
    },
    {
      "code": 6019,
      "name": "SplitStakeAccountAlreadyExist",
      "msg": "Split stake account already exist"
    },
    {
      "code": 6020,
      "name": "StakeAccountNotExist",
      "msg": "Stake account not exist"
    },
    {
      "code": 6021,
      "name": "RentNotEnough",
      "msg": "Rent not enough"
    },
    {
      "code": 6022,
      "name": "BalanceNotEnough",
      "msg": "Balance not enough"
    },
    {
      "code": 6023,
      "name": "CalculationFail",
      "msg": "Calulation fail"
    },
    {
      "code": 6024,
      "name": "AuthorityNotMatch",
      "msg": "Authority not match"
    },
    {
      "code": 6025,
      "name": "EraIsLatest",
      "msg": "Era is latest"
    },
    {
      "code": 6026,
      "name": "EraIsProcessing",
      "msg": "Era is processing"
    },
    {
      "code": 6027,
      "name": "EraIsProcessed",
      "msg": "Era is processed"
    },
    {
      "code": 6028,
      "name": "EraNoNeedBond",
      "msg": "Era no need bond"
    },
    {
      "code": 6029,
      "name": "EraNoNeedUnBond",
      "msg": "Era no need unbond"
    },
    {
      "code": 6030,
      "name": "EraNoNeedUpdateActive",
      "msg": "Era no need update active"
    },
    {
      "code": 6031,
      "name": "EraNoNeedUpdateRate",
      "msg": "Era no need update rate"
    },
    {
      "code": 6032,
      "name": "AmountUnmatch",
      "msg": "Amount unmatch"
    },
    {
      "code": 6033,
      "name": "InvalidUnstakeAccount",
      "msg": "Invalid unstake account"
    },
    {
      "code": 6034,
      "name": "UnstakeAccountNotClaimable",
      "msg": "Unstake account not claimable"
    },
    {
      "code": 6035,
      "name": "UnstakeAccountAmountZero",
      "msg": "Unstake account amount zero"
    },
    {
      "code": 6036,
      "name": "PoolBalanceNotEnough",
      "msg": "Pool balance not enough"
    },
    {
      "code": 6037,
      "name": "UnstakeAmountIsZero",
      "msg": "Unstake amount is zero"
    },
    {
      "code": 6038,
      "name": "ValidatorsNotEqual",
      "msg": "Validators not equal"
    },
    {
      "code": 6039,
      "name": "RateChangeOverLimit",
      "msg": "Rate change over limit"
    },
    {
      "code": 6040,
      "name": "MintAccountNotMatch",
      "msg": "Mint account not match"
    },
    {
      "code": 6041,
      "name": "MintAuthorityNotMatch",
      "msg": "Mint authority not match"
    },
    {
      "code": 6042,
      "name": "FreezeAuthorityNotMatch",
      "msg": "Freeze authority not match"
    },
    {
      "code": 6043,
      "name": "MintSupplyNotEmpty",
      "msg": "Mint supply not empty"
    },
    {
      "code": 6044,
      "name": "MintToOwnerNotMatch",
      "msg": "Mint to owner not match"
    },
    {
      "code": 6045,
      "name": "StakeAccountsLenOverLimit",
      "msg": "Stake accounts len over limit"
    }
  ]
};
