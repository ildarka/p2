var config = {
    "routes": {
        "/": {
            "template": "modules/pegas/pegas.html",
            "title": "PEGAS 2",
            "controller": "pegasCtrl"
        },
        "/dev": {
            "template": "modules/dev/dev.html",
            "title": "DEV",
            "controller": "devCtrl"
        }
    },
    "errors": {
        "INVALID_PARAMS": {
            "code": -32602,
            "message": "Invalid params"
        },
        "SERVER_ERROR": {
            "code": -32001,
            "message": "Ошибка на сервере"
        },
        "FORBIDDEN": {
            "code": -32011,
            "message": "Недостаточно прав"
        },
        "UNAUTORIZED": {
            "code": -32012,
            "message": "Пользователь неавторизован"
        },
        "LOGIN_FAILED": {
            "code": -32021,
            "message": "Неправильный логин/пароль"
        },
        "DUPLICATE_USER": {
            "code": -32022,
            "message": "Пользователь с таким именем уже существует"
        }
    },
    "api": {
        "ranger": {
            "description": "Ranger API",
            "Channel": {
                "id": "string",
                "pid": "string",
                "lid": "string",
                "mode": "string",
                "on": "string",
                "output_format": "string",
                "tx_addr": "string",
                "tx_port": "string",
                "recv_port": "string",
                "out_ip": "string",
                "out_mask": "string"
            },
            "ChannelStats": {
                "sync": "string",
                "recv_frames": "string",
                "recv_bytes": "string",
                "outp_packets": "string",
                "outp_bytes": "string",
                "proto_errors": "string",
                "outp_errors": "string",
                "sync_errors": "string"
            },
            "NetworkInterface": {
                "ip": "string",
                "mac": "string",
                "mask": "string",
                "name": "string",
                "link": "string",
                "up": "string"
            },
            "methods": {
                "GetNetworkInterfaces": {
                    "response": {
                        "ip": "string",
                        "mac": "string",
                        "mask": "string",
                        "name": "string",
                        "link": "string",
                        "up": "string"
                    }
                },
                "GET_CONFIG": {
                    "params": null,
                    "response": {
                        "id": "string",
                        "pid": "string",
                        "lid": "string",
                        "mode": "string",
                        "on": "string",
                        "output_format": "string",
                        "tx_addr": "string",
                        "tx_port": "string",
                        "recv_port": "string",
                        "out_ip": "string",
                        "out_mask": "string"
                    }
                },
                "GET_STATS": {
                    "params": null,
                    "response": {
                        "sync": "string",
                        "recv_frames": "string",
                        "recv_bytes": "string",
                        "outp_packets": "string",
                        "outp_bytes": "string",
                        "proto_errors": "string",
                        "outp_errors": "string",
                        "sync_errors": "string"
                    }
                },
                "RESET_STATS": {
                    "params": null
                },
                "MODIFY_CHANNEL": {
                    "params": {
                        "id": "string",
                        "pid": "string",
                        "lid": "string",
                        "mode": "string",
                        "on": "string",
                        "output_format": "string",
                        "tx_addr": "string",
                        "tx_port": "string",
                        "recv_port": "string",
                        "out_ip": "string",
                        "out_mask": "string"
                    },
                    "jsonschema": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
                            "pid": {
                                "type": "string"
                            },
                            "lid": {
                                "type": "string"
                            },
                            "mode": {
                                "type": "string"
                            },
                            "on": {
                                "type": "string"
                            },
                            "output_format": {
                                "type": "string"
                            },
                            "tx_addr": {
                                "type": "string"
                            },
                            "tx_port": {
                                "type": "string"
                            },
                            "recv_port": {
                                "type": "string"
                            },
                            "out_ip": {
                                "type": "string"
                            },
                            "out_mask": {
                                "type": "string"
                            }
                        }
                    }
                },
                "SET_OUTPUT_INTERFACE": {
                    "params": {
                        "TO_REPLACE": "boolean"
                    },
                    "jsonschema": {
                        "type": "object",
                        "properties": {
                            "TO_REPLACE": {
                                "type": "boolean"
                            }
                        }
                    }
                },
                "CLEAR_CONFIG": {
                    "params": {
                        "TO_REMOVE": "boolean"
                    },
                    "jsonschema": {
                        "type": "object",
                        "properties": {
                            "TO_REMOVE": {
                                "type": "boolean"
                            }
                        }
                    }
                },
                "CREATE_CHANNEL": {
                    "params": {
                        "TO_REMOVE": "boolean"
                    },
                    "jsonschema": {
                        "type": "object",
                        "properties": {
                            "TO_REMOVE": {
                                "type": "boolean"
                            }
                        }
                    }
                },
                "DELETE_CHANNEL": {
                    "params": {
                        "TO_REMOVE": "boolean"
                    },
                    "jsonschema": {
                        "type": "object",
                        "properties": {
                            "TO_REMOVE": {
                                "type": "boolean"
                            }
                        }
                    }
                }
            }
        }
    },
    "wsport": 3001,
    "port": 3000,
    "baseUri": "http://localhost",
    "description": null,
    "title": "Aggregator GUI"
};
