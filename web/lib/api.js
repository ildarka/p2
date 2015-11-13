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
