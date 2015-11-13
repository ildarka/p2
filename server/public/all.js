var app = angular.module("app",['ngRoute', 'ngAnimate', 'ngStorage', 'templates']);

app.controller("appCtrl", function($rootScope, $window, $location, $filter, $http, $timeout, $localStorage, api) {

  // Return current user object
  $rootScope.me = function() {
    return $localStorage.me;
  };

  // Access control
  $rootScope.ACL = function(access, debug) {
    if (debug) console.log(access, access.indexOf($localStorage.me.role) !== -1);
    if (!access) return true;
    if (!$localStorage.me) return false;
    return (access.indexOf($localStorage.me.role) !== -1);
  };  

  $rootScope.scrollTop = function() {
    $window.scrollTo(0,0);
  }

  $rootScope.messageError = function(err) {
    if ($rootScope.clearMessage) $timeout.cancel($rootScope.clearMessage);
    $rootScope.messageBox = err.message;
    $rootScope.messageBoxError = true;
    $rootScope.clearMessage = $timeout(function(){
      $rootScope.messageBox = null;
    }, 5000);
  }
  
  $rootScope.findRoute = function() {
    var url = $location.path();
    if (url in $rootScope.config.routes) {
      $rootScope.route = $rootScope.config.routes[url];
    } else {
      console.error('Route '+ url + ' not found!');
    }
  };
    
  // Отработка начала перехода на новый скрин
  $rootScope.$on('$routeChangeStart', function(scope, next, current) {
    $rootScope.scrollTop();

    // Формирование массива params
    $rootScope.params = (next) ? next.params : current.params;

    $rootScope.findRoute();
  });
  
  // Init
  $rootScope.api = api('/api');
  $rootScope.config = config;
  $rootScope.findRoute();
});


// HTTP version of api
app.factory('api', function($rootScope, $localStorage, $http) {
  
  function jsonrpc2() {
    var id = 1;
    return {
      serialize: function(method, params) {

        if (!method) {
          console.error('No method in request');
        }

        var preparedParams = {};
        preparedParams = params;
        
        /*
        if (params.token) {
          preparedParams.token = params.token;
        }
        */
        
        /*
        // Sanitize params & cast types
        if (method && params && config && config.api) {
          var mm = method.split('.');
          var type;
          if (config.api[mm[0]]) {
            if (config.api[mm[0]].methods && config.api[mm[0]].methods[mm[1]] && config.api[mm[0]].methods[mm[1]].params) {
              var proto = config.api[mm[0]].methods[mm[1]].params;
              
              for (var key in proto) {
                if (typeof proto[key] == 'object' && proto[key].type) {
                  type = proto[key].type;
                } else {
                  type = proto[key];
                }
                
                switch (type) {
                  case 'number':
                    preparedParams[key] = +params[key];
                    break;
                  case 'boolean':
                    preparedParams[key] = !!params[key];
                    break;
                  default:
                    preparedParams[key] = params[key];
                }
                
              }
            }
          }
        }
        */
        
        var o = {
          method: method,
          id: id++,
          jsonrpc: '2.0',
          params: preparedParams
        };

        return o;
      },

      parse: function(data) {
        var o;

        if (typeof data === 'string') {
          try {
            o = JSON.parse(data);
          } catch(e) {
            console.error(e);
          }
        } else {
          o = data;
        }

        if (o.error) {
          console.error(o.error);
        }

        return o;
      }
    }
  }
  
  var connectStr;

  var cbks = {};
  var silents = {};
  var jsonrpc = jsonrpc2(); 
  
  // Отменить все коллбеки
  $rootScope.$on('$routeChangeSuccess', function(scope, next, current) {
    cbks = {};
    silents = {};
  });

      
    return function init(connection) {

    connectStr = connection;
    
    return function api(method, params, cbk, silent) {
      
          if (typeof params == 'function') {
            cbk = params;
            params = {};
          }
        
          /*
          if ($localStorage.me && $localStorage.me.token) {
            params = params || {};
            params.token = $localStorage.me.token;
          }
          */
      
          var c = jsonrpc.serialize(method, params);

          if (typeof cbk === 'function') {
            cbks[c.id] = cbk;
          }
        
          if (typeof silent !== 'undefined') {
            silents[c.id] = true;
          } 
          
          console.log('→', JSON.stringify(c));
          
          $http.post(connectStr, JSON.stringify(c)).then(function(response) {
            var data = response.data;
            //console.log('← DATA FROM SERVER', response, data);
            
            var data = jsonrpc.parse(data);
            
            console.log('←', data);
            
            if (typeof data.id != 'undefined' && typeof cbks[data.id] === 'function') {
              $rootScope.safeApply(function() {

                // Удаление схемы пользователя если он не авторизован на сервере
                if (data.error) {
                  if (data.error.code == -32012 && $localStorage.me) {
                    $localStorage.me = null;
                  }

                  if (!silents[data.id]) $rootScope.messageError(data.error);
                }

                cbks[data.id](data.error, data.result);
                cbks[data.id] = null;
              });
            }

            
          });

      
    };
  }
});


/* filters for dev */
app.filter('formatedParams', function() {
      return function(o) {
        var object = angular.copy(o);
        for(var key in object) {
          if (object[key] = "number") object[key] = '';
        }
        return JSON.stringify(object, null, 4);
}});

app.filter('JSON', function() {
      return function(o) {
        return JSON.stringify(o, null, 4);
}});

/* Округление */
function precise_round(num, decimals) { return (+num).toFixed(decimals) }

/* Форматирование размера (Мб, Кб, ..). Вход: байты */
app.filter('byteformat', function() {
  return function(size) {
    var symbol = ['Б', 'кБ', 'МБ', 'ГБ'], base = 1024, rank = 0;
    // size >= 0
    size = (typeof size == 'undefined' || +size<=0 ) ? 0 : size;
    // выяснить наибольший rank размера
    if (size!=0) {for (var i=1; i <= symbol.length - 1; i++) if (size >= base) {size = size / base; rank = i} }
    // округлить размер до первого знака после запятой (с учётом rank'а)
    size = (rank>=1) ? precise_round(size, 1) : precise_round(size, 0);
    // вывести вместе с единицей измерения
    return (size.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ').replace('.', ',') + '\u00A0' + symbol[rank]);
  };
});

/* Форматирование скорости передачи данных. Вход: байты ("октеты") в секунду */
app.filter('rateformat', function() {
  return function(rate) {
    // градации
    var symbol = ['бит/с', 'кбит/с', 'Мбит/с', 'Гбит/с'], base = 1000, rank = 0;
    // преобразовать из байтов ("октетов") в секунду в биты в секунду
    rate = (typeof rate == 'undefined' || +rate<=0 ) ? 0 : rate*8;
    // выяснить наибольший rank данной величины
    if (rate!=0) {for (var i=1; i<=3; i++) if (rate >= base) {rate = rate / base; rank = i} }
    // округлить величину до первого знака после запятой (с учётом rank'а)
    rate = (rank>=1) ? precise_round(rate, 1) : precise_round(rate, 0);
    // вывести вместе с единицей измерения
    return (rate.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ').replace('.', ',') + '\u00A0' + symbol[rank]);
  };
});

/* Форматирование скорости передачи данных. Вход: байты ("октеты") в секунду */
app.filter('freqformat', function() {
  return function(rate) {
    // градации
    var symbol = ['Гц', 'кГц', 'МГц', 'ГГц'], base = 1000, rank = 0;
    // преобразовать из байтов ("октетов") в секунду в биты в секунду
    rate = (typeof rate == 'undefined' || +rate<=0 ) ? 0 : rate*8;
    // выяснить наибольший rank данной величины
    if (rate!=0) {for (var i=1; i<=3; i++) if (rate >= base) {rate = rate / base; rank = i} }
    // округлить величину до первого знака после запятой (с учётом rank'а)
    rate = (rank>=1) ? precise_round(rate, 1) : precise_round(rate, 0);
    // вывести вместе с единицей измерения
    return (rate.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ').replace('.', ',') + '\u00A0' + symbol[rank]);
  };
});

//  Angular роутинг --------------------------------------------------------------
app.config(function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
  $locationProvider.html5Mode(true);

  var route;
  
  for (var url in config.routes) {
    route = config.routes[url];

    var filename = ((url == '/') ? 'index' : url.substr(1)) + '.html';

    // страница
    var page = { templateUrl: route.template || filename };

    // controller страницы
    if (route.controller) page.controller = route.controller;

    $routeProvider.when(url, page);
  }
});

    // Safe Apply
    angular.module('app').run(['$rootScope', function($rootScope) {
            $rootScope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
    }]);


app.directive("autoGrow", ['$window', function($window){
    return {
        link: function (scope, element, attr, $window) {
            var update = function () {
                var scrollLeft, scrollTop;
                scrollTop = window.pageYOffset;
                scrollLeft = window.pageXOffset;

                element.css("height", "auto");
                var height = (element[0].scrollHeight) + 6;
                if (height > 0) {
                    element.css("height", height + "px");
                }
                window.scrollTo(scrollLeft, scrollTop);
            };
            scope.$watch(attr.ngModel, function () {
                update();
            });
            attr.$set("ngTrim", "false");
        }
    };
}]);

app.directive('contenteditable', function () {
      return {
          restrict: 'A', // only activate on element attribute
          require: '?ngModel', // get a hold of NgModelController
          link: function (scope, element, attrs, ngModel) {
              if (!ngModel) return; // do nothing if no ng-model

              // Specify how UI should be updated
              ngModel.$render = function () {
                  element.html(ngModel.$viewValue || '');
              };

              // Listen for change events to enable binding
              element.on('blur keyup change', function () {
                  scope.$apply(readViewText);
              });

              // No need to initialize, AngularJS will initialize the text based on ng-model attribute

              // Write data to the model
              function readViewText() {
                  var html = element.html();
                  // When we clear the content editable the browser leaves a <br> behind
                  // If strip-br attribute is provided then we strip this out
                  if (attrs.stripBr && html == '<br>') {
                      html = '';
                  }
                  ngModel.$setViewValue(html);
              }
          }
      };
  });

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});


  app.controller("devCtrl", function($scope, $filter, $http, $timeout, $localStorage, api) {
            
      $scope.initMethod = function(model, method, vmethod) {
        vmethod.methodname = model + '.' + method;
        if (vmethod.params) {
          vmethod.formatedParams = $filter('formatedParams')(vmethod.params);
        } else {
          vmethod.formatedParams = null;
        }
      };

      
      $scope.apicall = function(method, params, vmethod, cbk) {
        
        vmethod._inprogress = true;
                
        try {
          var p = (params) ? JSON.parse(params) : null;
          var start = new Date();
          vmethod.error = false;

          $scope.api(method, p, function(err, result) {

              var elapsed = new Date() - start;
              vmethod._elapsed = elapsed;
              vmethod._inprogress = false;
              
              vmethod._result = (result && typeof result === 'object') ? JSON.stringify(result, null, 4) : result;
              vmethod._error = (err && typeof err === 'object') ? JSON.stringify(err, null, 4) : err;
              
              if (typeof cbk == 'function') cbk(err, result);
            
          });
        } catch(e) {
          vmethod._jsonerror = true;
          vmethod._shake = true;
          console.error('JSON parse error', e);
        }
      };
      
      $scope.testAll = function() {
        var vmethod, vmodel;
        $scope._testAll = false;
        $scope.forms = true;
        $scope.expand = true;        
        $scope._allErrors = 0;
        for(var model in $scope.config.api) {
          vmodel = $scope.config.api[model];
          for(var method in vmodel.methods) {
            vmethod = vmodel.methods[method];
              $scope.initMethod(model,method,vmethod);
              $scope.apicall(vmethod.methodname,vmethod.formatedParams,vmethod, function(err, result) {
                 if (err) $scope._allErrors++;
              });
          }
        }
        
        $timeout(function() {
          $scope._testAll = true;
        }, 300);
        
      };

      $scope.login = function() {
        
        $scope._loginerror = false;
        
        $scope.api('users.login', {'name': $scope.name, 'password': $scope.password}, function(err, res) {
            if (err) {
              $scope._loginerror = true;
            } else {
              $scope.autorized = true;
              $localStorage.me = res;
              $scope.me = res;
            }
        });
      };       
      
      $scope.logout = function() {
        $scope.api('users.logout', {'token': $localStorage.me.token}, function(err, res) {
            $scope.autorized = false;
            $localStorage.me = null;
            $scope.me = null;
        });
      }; 
      
      // Init
      $scope.autorized = false;
      $scope.forms = true;
      $scope.expand = true;

      if ($localStorage.me) {
          $scope.autorized = true;
          $scope.me = $localStorage.me;        
      }
      
      $scope.method = '';
      $scope.vmethod = {
        params: {}
      }
      $scope.formatedParams = '{"id": 0}';
    
    });



app.controller("loginCtrl", function($scope, $localStorage, $location, $route) {

  // Initial model
  var model = {
    name: '',
    password: '',
    show: false,
    error: false
  };
  
  $scope.login = function() {
    
    $scope.model.error = false;
    
    $scope.api('users.login', {'name':$scope.model.name, 'password':$scope.model.password}, function(err, res) {
        if (err) {
          $scope.model.error = true;
        } else {
          $scope.model = angular.copy(model);
          $localStorage.me = res;
          $route.reload();
        }
    }, true);
  };       
  
  $scope.register = function() {
    $scope.model.errorregister = false;
    $scope.api('users.register', {'name':$scope.model.name, 'password':$scope.model.password}, function(err, res) {
        if (err) {
          $scope.model.error = true;
          $scope.model.errorregister = true;
        } else {
          $scope.model.message = 'Дождитесь пока Администратор подтвердит вашу регистрацию.';
        }
    });
  };       

  $scope.logout = function() {
    $scope.api('users.logout', {'token': $localStorage.me.token}, function(err, res) {
      $localStorage.me = null;
      $location.path('/');
      $route.reload();
    });
  };   
  
  // Init
  $scope.model = angular.copy(model);
});


  app.controller("pegasCtrl", function($scope, $filter, $http, $timeout, $localStorage, api) {
        
    $scope.lang = {
      decibell: 'дБ',
      dbm: 'дБм',
      channel: {
        freq: 'Несущая L-частота',
        symbolfreq: 'Символьная частота',
        level: 'Уровень сигнала',
        standard: 'Стандарт сигнала',
        noise: 'Cигнал/шум',
        ber: 'BER',
        acm: 'ACM',
        modcode: 'Модкод',
        output: 'Выходной поток',
        receiver: 'Получатель',
        train: 'Паровоз',
        auto: 'Авто',
        outputNumber: 'Выходной интерфейс'
      },
      worker: 'Обработка',
      workers: {
        TRANSPARENT: 'Без обработки'
      }
    };
    
    $scope.outputs = {
      gateway: '192.168.0.1',
      interfaces: [
        {'ip': '192.168.0.10', mask: '255.255.255.0'},
        {'ip': '192.168.0.2', mask: '255.255.255.0'},
        {'ip': '192.168.0.4', mask: '255.255.255.0'},
        {'ip': '192.168.0.1', mask: '255.255.255.0'}
      ]
    };
    
    $scope.outputSetup = false;
    
    $scope.selectedChannel = false;

    $scope.getChannels = function() {
        
        $scope.channels = [];
        
        // Randomize
        var channel;

        var formats = ['TRAIN', 'UDP'];
        
        for(var i=0; i<8; i++) {
          channel = {
            id: i,
            freq: Math.round(Math.random(1) * 100000),
            symbolfreq: Math.round(Math.random(1) * 10000),
            level: Math.round(Math.random(1) * 60),
            standard: 'DVB-S2',
            noise: Math.round(Math.random(1) * 10),
            ber: Math.round(Math.random(1) * 60),
            esn0: Math.round(Math.random(1) * 60),
            ebn0: Math.round(Math.random(1) * 60),
            acm: Math.round(Math.random(1) * 60),
            modcode: 'Q4',
            outputRate: Math.round(Math.random(1) * 10000),
            sync: !!Math.round(Math.random(1)*2),
            syncOut: !!Math.round(Math.random(1)*2),
            typeframe: 'Стандарт',
            pilot: 'FA_SAT_IQ_FORCE',
            kround: 0.7,
            transport: 'Generic',

            settings: {
              standard: 'AUTO',
              freq: Math.round(Math.random(1) * 100000),
              symbolfreq: Math.round(Math.random(1) * 10000),
              method: 'COLD',
              searchRange: Math.round(Math.random(1) * 10000),
              inverse: 'AUTO',
              worker: 'TRANSPARENT',
              outputStatus: !!Math.round(Math.random(1)),
              outputFormat: formats[Math.round(Math.random(1))],
              outputNumber: (i % 3 + 1),
              dstIp: '192.168.10.1',
              dstPort: '5010',
              pid: 1,
              lid: 0,              
            }
          };
          
          $scope.channels.push(channel);
        }
        
        
        // Normalize
        $scope.channels.forEach(function(i) {
          i.num = i.id + 1;
        });
        
        
      };

    
    $scope.saveInterfaces = function() {
      if (confirm('Потребуется перезагрузка устройства')) {
        
      }
    };
    
    $scope.selectChannel = function(channel) {
      if ($scope.selectedChannel != channel.num) {
        $scope.selectedChannel = channel.num;
        
      } else {
        $scope.selectedChannel = false;
      }
    }
    
     // Init
    $scope.getChannels();

});


app.controller("usersCtrl", function($scope) {
  
  $scope.get = function(cbk) {
    $scope.api('users.get', function(err, result) {
      if (err) {
        
      } else {
        $scope.usersNEW = result.filter(function(i) {return i.state == 'NEW'; });
        $scope.usersBAN = result.filter(function(i) {return i.state == 'BAN'; });
        $scope.users = result.filter(function(i) {return i.state == 'ACTIVE'; });
        
        if (typeof cbk == 'function') cbk(result);
      }
    });
  };

  $scope.remove = function(id) {
    if (confirm('Вы действительно хотите удалить пользователя?')) {
      $scope.api('users.remove', {id: id}, function(err, result) {
        $scope.get();
      });
    }
  };

  $scope.update = function(item) {
    $scope.api('users.update', item, function(err, result) {
        $scope.get();
    });
  };
  
  $scope.aprove = function(u) {
    u.state = 'ACTIVE';
    u.role = 'user';
    $scope.api('users.update', u, function(err, result) {
      $scope.get();
    });
  };

  $scope.ban = function(id) {
    $scope.api('users.switchState', {id: id, state: 'BAN'}, function(err, result) {
      $scope.get();
    });
  };
  
  $scope.select = function(item) {
    $scope.users.forEach(function(i) {
      if (item == i) i.selected = true; else i.selected = false;
    });
  };
  
  // Init
  $scope.get();
  
});


//# sourceMappingURL=all.js.map