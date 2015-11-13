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
