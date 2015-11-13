(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index.html',
    '<html ng-app="app">\n' +
    '<head>\n' +
    '  <meta charset="utf-8" />\n' +
    '  <base href="/" />  \n' +
    '  <link rel="stylesheet" href="lib/sega2/sega2.css" />\n' +
    '  <link rel="stylesheet" href="all.css" />\n' +
    '  <link href="favicon.ico" rel="icon" />\n' +
    '  <title>ПЕГАС 2</title>\n' +
    '</head>\n' +
    '  \n' +
    '<body ng-controller="appCtrl">\n' +
    '\n' +
    '  <div ng-include="\'components/messageBox/messageBox.html\'"></div>\n' +
    '  \n' +
    '  <main>\n' +
    '    \n' +
    '    <article ng-view="" class="view"></article>\n' +
    '    \n' +
    '  </main>\n' +
    '</body>\n' +
    '  \n' +
    '<script src="lib/angularjs/angular.js"></script>\n' +
    '<script src="lib/ngstorage/ngStorage.min.js"></script>\n' +
    '<script src="lib/angular-route/angular-route.min.js"></script>\n' +
    '<script src="lib/angular-animate/angular-animate.min.js"></script>\n' +
    '  \n' +
    '<script src="config.js">;</script>\n' +
    '<script src="templates.js">;</script>\n' +
    '<script src="all.js">;</script>\n' +
    '\n' +
    '</html>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/messageBox/messageBox.html',
    '<div class="messageBox" ng-class="{error: messageBoxError}" ng-show="messageBox">\n' +
    '  <!--i class="close mdi mdi-close"></i-->\n' +
    '  {{messageBox}}\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/dev/dev.html',
    '  <div class="dev">\n' +
    '\n' +
    '    <div style="margin-left:-10px">\n' +
    '      <span class="tap" ng-class="{\'-active\': expand}"><a ng-click="expand=!expand">Expand all</a></span> \n' +
    '      <span class="tap" ng-class="{\'-active\': forms}"><a ng-click="forms=!forms">Show forms</a></span> \n' +
    '      <span style="margin-right:20px" class="tap" ng-class="{\'-active\': params}"><a ng-click="params=!params">Show params</a></span>\n' +
    '      <button style="margin-right:20px" class="-rounded" ng-click="testAll()">Test all API</button>\n' +
    '      <span class="allErrors" ng-show="_allErrors">Errors: {{_allErrors}}</span>\n' +
    '      <span ng-show="_testAll && !_allErrors">All OK!</span>\n' +
    '    </div>\n' +
    '    \n' +
    '    <article class="clearfix" ng-repeat="(model, vmodel) in config.api">\n' +
    '      <h1>{{model | uppercase}}</h1>\n' +
    '        \n' +
    '      \n' +
    '      \n' +
    '      \n' +
    '          <div class="method clearfix" ng-init="initMethod(model,method,vmethod)">\n' +
    '            <div>\n' +
    '              Custom method\n' +
    '            </div>\n' +
    '            \n' +
    '            <div class="form" ng-show="forms">\n' +
    '              <input type="text" ng-model="method" style="margin-bottom:5px; width:200px" placeholder="Custom method" />\n' +
    '              <textarea style="height:6em" ng-model="formatedParams" auto-grow ng-class="{jsonerror: vmethod._jsonerror, shake: vmethod._shake}"></textarea>\n' +
    '              <div>\n' +
    '                <input type="submit" class="-small -blue" value="Отправить" ng-click="apicall(method,formatedParams,vmethod)" /> \n' +
    '\n' +
    '                <span class="elapsed">\n' +
    '                  <span ng-if="!vmethod._inprogress && vmethod._elapsed"><span ng-bind="vmethod._elapsed"></span> ms</span>\n' +
    '                  <span ng-if="vmethod._inprogress"><i class="fa fa-spin fa-circle-o-notch"></i></span>\n' +
    '                </span>\n' +
    '              </div>\n' +
    '              \n' +
    '              <div ng-if="vmethod._result && !vmethod._error" class="result">\n' +
    '                <pre class="json">{{vmethod._result}}</pre>\n' +
    '              </div>\n' +
    '              \n' +
    '              <div ng-if="vmethod._error" class="error">\n' +
    '                <pre class="json">Error: {{vmethod._error}}</pre>\n' +
    '              </div>\n' +
    '              \n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <!-- /custom -->\n' +
    '      \n' +
    '      \n' +
    '      \n' +
    '          <div class="method clearfix" ng-repeat="(method, vmethod) in vmodel.methods" ng-init="initMethod(model,method,vmethod)">\n' +
    '            <div>\n' +
    '              <a class="pseudo-link" ng-click="vmethod.expand = !vmethod.expand">{{vmethod.methodname}}</a>\n' +
    '            </div>\n' +
    '            \n' +
    '            <div class="more" ng-show="expand || vmethod.expand">\n' +
    '            <div class="form" ng-show="forms">\n' +
    '              <textarea ng-if="vmethod.params" style="height:6em" ng-model="vmethod.formatedParams" auto-grow ng-class="{jsonerror: vmethod._jsonerror, shake: vmethod._shake}"></textarea>\n' +
    '              <div>\n' +
    '                <input type="submit" class="-small -blue" value="Отправить" ng-click="apicall(vmethod.methodname,vmethod.formatedParams,vmethod)" /> \n' +
    '\n' +
    '                <span class="elapsed">\n' +
    '                  <span ng-if="!vmethod._inprogress && vmethod._elapsed"><span ng-bind="vmethod._elapsed"></span> ms</span>\n' +
    '                  <span ng-if="vmethod._inprogress"><i class="fa fa-spin fa-circle-o-notch"></i></span>\n' +
    '                </span>\n' +
    '              </div>\n' +
    '              <div ng-if="vmethod._result && !vmethod._error" class="result">\n' +
    '                <pre class="json">{{vmethod._result}}</pre>\n' +
    '              </div>  \n' +
    '              <div ng-if="vmethod._error" class="error">\n' +
    '                <pre class="json">Error: {{vmethod._error}}</pre>\n' +
    '              </div>  \n' +
    '            </div>\n' +
    '              \n' +
    '\n' +
    '            <div class="params" ng-show="params">\n' +
    '              <pre class="request json" ng-if="vmethod.params">Request prototype:\n' +
    '{{vmethod.params | JSON}}\n' +
    '              </pre>\n' +
    '              <pre class="request json" ng-if="vmethod.response" ng-class="{\'no-top-padding\': vmethod.params}">Response prototype:\n' +
    '{{vmethod.response | JSON}}\n' +
    '              </pre>\n' +
    '\n' +
    '            </div>\n' +
    '                        \n' +
    '          </div>  \n' +
    '    </article>  \n' +
    '\n' +
    '    \n' +
    '  </div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/login/login.html',
    '<div class="login" ng-controller="loginCtrl">\n' +
    '\n' +
    '  <div class="unautorized" ng-show="!me()">\n' +
    '  <a class="pseudo-link" ng-click="model.show=!model.show">Login</a>\n' +
    '  <form name="userform" ng-show="model.show" class="panel -panel-white form" ng-submit="login()" ng-class="{shake: model.error}">\n' +
    '    <i class="mdi mdi-window-close -pull-right" ng-click="model.show = false"></i>\n' +
    '    <div class="field">\n' +
    '      <label>Пользователь</label>\n' +
    '      <input ng-model="model.name" required type="text" />\n' +
    '    </div>  \n' +
    '    <div class="field">\n' +
    '      <label>Пароль</label>\n' +
    '      <input ng-model="model.password" required type="password" />\n' +
    '    </div>\n' +
    '    <input type="submit" value="Войти" class="-m-right" ng-class="{\'-disabled\':!userform.$valid}" /> \n' +
    '    <a class="pseudo-link" ng-click="register()">Регистрация</a>\n' +
    '    \n' +
    '    <p class="error" ng-show="model.errorregister">Это имя пользователя уже занято!</p>\n' +
    '    <p ng-show="model.message">{{model.message}}</p>\n' +
    '    \n' +
    '  </form>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="autorized" ng-show="me()">\n' +
    '    <a class="pseudo-link" ng-click="model.show=!model.show"><i class="mdi mdi-account"></i> {{me().name}}</a>\n' +
    '    <div class="panel -panel-white form"  ng-show="model.show">\n' +
    '      <i class="mdi mdi-window-close -pull-right" ng-click="model.show = false"></i>\n' +
    '      <a class="pseudo-link" ng-click="logout()">Выход</a>\n' +
    '    </div>\n' +
    '  </div>  \n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/pegas/pegas.html',
    '<div class="channels">\n' +
    '\n' +
    '    <div ng-repeat="channel in channels track by $index" ng-click="selectChannel(channel)" class="paper channel" ng-class="{\'unsync\': !channel.sync, \'selected\': channel.num == selectedChannel }">\n' +
    '      \n' +
    '      <div class="roundbadge" ng-class="{\'unsync\': !channel.sync, \'sync\': channel.sync}">{{channel.num}}</div>\n' +
    '      \n' +
    '      <!--h2>Канал № {{channel.num}}</h2-->\n' +
    '      \n' +
    '      <dl>\n' +
    '        <dt>{{lang.channel.freq}}</dt>\n' +
    '        <dd>{{channel.freq | freqformat}}</dd>\n' +
    '        \n' +
    '        <dt>{{lang.channel.symbolfreq}}</dt>\n' +
    '        <dd>{{channel.symbolfreq | freqformat}}</dd>\n' +
    '\n' +
    '        <dt>{{lang.channel.standard}}</dt>\n' +
    '        <dd>{{channel.standard}}</dd>\n' +
    '        \n' +
    '        <dt>{{lang.channel.level}}</dt>\n' +
    '        <dd>{{channel.level}} {{lang.dbm}}</dd>\n' +
    '                \n' +
    '        <dt ng-class="{\'error\': !channel.sync}">{{lang.channel.noise}}</dt>\n' +
    '        <dd ng-class="{\'error\': !channel.sync}"><div ng-if="channel.noise">{{channel.noise}} {{lang.decibell}}</div></dd>\n' +
    '\n' +
    '        <dt>{{lang.channel.ber}}</dt>\n' +
    '        <dd>{{channel.ber}}</dd>\n' +
    '      </dl>\n' +
    '\n' +
    '      <dl ng-if="channel.standard == \'DVB-S2\'">\n' +
    '        <dt>\n' +
    '        {{lang.channel.acm}}: {{channel.acm}}\n' +
    '        </dt>\n' +
    '      \n' +
    '        <dd>\n' +
    '        {{lang.channel.modcode}}: {{channel.modcode}}\n' +
    '        </dd>\n' +
    '      </dl>\n' +
    '\n' +
    '      <dl ng-if="channel.standard == \'DVB-S2\'">\n' +
    '        <dt>\n' +
    '        {{lang.worker}}\n' +
    '        </dt>\n' +
    '      \n' +
    '        <dd>\n' +
    '        {{lang.workers[channel.settings.worker]}}\n' +
    '        </dd>\n' +
    '      </dl>\n' +
    '\n' +
    '      <dl>\n' +
    '        <dt>{{lang.channel.outputNumber}}</dt>\n' +
    '        <dd>\n' +
    '          № {{channel.settings.outputNumber}}\n' +
    '        </dd>\n' +
    '      </dl>\n' +
    '      \n' +
    '    <!--\n' +
    '     <dl>\n' +
    '        <dt>{{lang.channel.receiver}}</dt>\n' +
    '        <dd>\n' +
    '          {{channel.settings.dstIp}}:{{channel.settings.dstPort}}\n' +
    '        </dd>\n' +
    '     </dl>\n' +
    '\n' +
    '     <dl ng-if="channel.settings.outputFormat == \'TRAIN\'">\n' +
    '       <dt>{{lang.channel.train}}</dt>\n' +
    '       <dd>PID: {{channel.settings.pid}}, LID: {{channel.settings.lid}}</dd>\n' +
    '     </dl>\n' +
    '      -->\n' +
    '     <dl>\n' +
    '       <dt>{{lang.channel.output}}</dt>\n' +
    '       <dd>{{channel.outputRate | rateformat}}</dd>\n' +
    '     </dl>      \n' +
    '\n' +
    '      <div class="settings" ng-if="channel.num == selectedChannel" ng-click="$event.stopPropagation();">\n' +
    '        <div class="field">\n' +
    '          <label>{{lang.channel.freq}}</label>\n' +
    '          <input type="text" ng-model="channel.freq" />\n' +
    '        </div>\n' +
    '        <div class="field">\n' +
    '          <label>{{lang.channel.symbolfreq}}</label>\n' +
    '          <input type="text" ng-model="channel.symbolfreq" />\n' +
    '        </div>\n' +
    '        <div class="field">\n' +
    '          <label>{{lang.channel.standard}}</label>\n' +
    '          <select>\n' +
    '            <option>Авто</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="field">\n' +
    '          <label>Диапазон поиска</label>\n' +
    '           <input type="text" ng-model="channel.symbolfreq" />\n' +
    '        </div>\n' +
    '        <div class="field">\n' +
    '          <label>Инверсия спектра</label>\n' +
    '          <select>\n' +
    '            <option>Авто</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="field">\n' +
    '          <label>Алгоритм поиска</label>\n' +
    '          <select>\n' +
    '            <option>Авто</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        \n' +
    '        <hr />\n' +
    '\n' +
    '        <div class="field">\n' +
    '          <label>Обработка</label>\n' +
    '          <select>\n' +
    '            <option>Без обработки</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div class="field">\n' +
    '          <label>Выходной интерфейс</label>\n' +
    '          <select>\n' +
    '            <option>№ 1</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div class="field">\n' +
    '          <label>Получатель</label>\n' +
    '          <input type="text" ng-model="channel.settings.dstIP" /> : <input type="text" ng-model="channel.settings.dstPort" class="port"/>\n' +
    '        </div>        \n' +
    '\n' +
    '        <div class="field">\n' +
    '          <label>Формат</label>\n' +
    '          <select>\n' +
    '            <option>UDP</option>\n' +
    '            <option>Паровоз</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        \n' +
    '        \n' +
    '        <div class="submit">\n' +
    '          <button class="button -rounded">Применить</button>\n' +
    '        </div>\n' +
    '        \n' +
    '      </div>      \n' +
    '     <div ng-if="channel.num == selectedChannel" style="margin-top:1em">\n' +
    '       <a class="pseudo-link" ng-click="$event.stopPropagation();">Построить векторную диаграмму</a>\n' +
    '     </div>\n' +
    '\n' +
    '  </div>\n' +
    '  \n' +
    '</div>\n' +
    '\n' +
    '<br clear="all" />\n' +
    '\n' +
    '<div class="bottoms">\n' +
    '  <a class="pseudolink -pull-right pseudo-link" ng-click="outputSetup = !outputSetup">Настроить сетевые интерфейсы</a>\n' +
    '  \n' +
    '  <div class="shift-left">Default Gateway: \n' +
    '    <span ng-if="!outputSetup">{{outputs.gateway}}</span>\n' +
    '    <span ng-if="outputSetup">\n' +
    '      <input ng-model="outputs.gateway" type="text" />\n' +
    '    </span>\n' +
    '  </div>\n' +
    '  \n' +
    '  <div class="interfaces">\n' +
    '    <div ng-repeat="interface in outputs.interfaces" class="interface" ng-init="num = $index + 1">\n' +
    '      <div class="inputs">\n' +
    '        <div ng-repeat="channel in channels track by $index" ng-if="channel.settings.outputNumber == num" class="roundbadge" ng-class="{\'unsync\': !channel.sync, \'sync\': channel.sync}">\n' +
    '          {{channel.num}}\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      \n' +
    '      <h2>\n' +
    '      Выход № {{num}}\n' +
    '      </h2>\n' +
    '      <label>IP-адрес:</label> <span ng-if="!outputSetup">{{interface.ip}}</span>\n' +
    '        <span ng-if="outputSetup">\n' +
    '          <input ng-model="interface.ip" type="text" />\n' +
    '        </span>\n' +
    '      <div>\n' +
    '        <label>Маска:</label> <span ng-if="!outputSetup">{{interface.mask}}</span>\n' +
    '        <span ng-if="outputSetup">\n' +
    '          <input ng-model="interface.mask" type="text" />\n' +
    '        </span>        \n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  \n' +
    '  <br clear="all" />\n' +
    '  \n' +
    '  <div class="shift-left submit" ng-if="outputSetup" >\n' +
    '    <button class="button -green -rounded" ng-click="saveInterfaces()">Сохранить</button>\n' +
    '  </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/users/users.html',
    '<h1>\n' +
    '  {{route.title}}\n' +
    '</h1>\n' +
    '\n' +
    '<div class="users clearfix columns2">\n' +
    '\n' +
    '<div class="column">\n' +
    '    <ul>\n' +
    '      <li ng-repeat="u in users | orderBy : \'id\' track by $index">\n' +
    '        <div class="-pull-right" ng-if="u.id != me().id">\n' +
    '          <select ng-model="u.role" ng-change="update(u)" ng-options="key as value for (key, value) in config.api.users.roles" class="role -m-right" >\n' +
    '          </select>  \n' +
    '          <a ng-click="ban(u.id)" class="pseudo-link -muted"><i class="mdi mdi-window-close"></i> Бан</a>\n' +
    '        </div>\n' +
    '        <i class="mdi mdi-account"></i>\n' +
    '        <b>{{u.name}}</b>\n' +
    '\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '\n' +
    '<div class="column panel" ng-show="usersNEW.length || usersBAN.length">\n' +
    '    <div ng-show="usersNEW.length">\n' +
    '      <i>Ждут подтверждения</i>\n' +
    '      <ul>\n' +
    '        <li ng-repeat="u in usersNEW">\n' +
    '          <div class="-pull-right">\n' +
    '            <a ng-click="aprove(u)" class="pseudo-link -m-right"><i class="mdi mdi-check"></i> OK</a>\n' +
    '            <a ng-click="remove(u.id)" class="pseudo-link -muted"><i class="mdi mdi-window-close"></i> Удалить</a>\n' +
    '          </div>\n' +
    '\n' +
    '          <span class="date">{{u.date | date : "dd.MM.yyyy"}}</span> \n' +
    '          <i class="mdi mdi-account"></i>\n' +
    '          <b>{{u.name}}</b>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '    \n' +
    '    <div ng-class="{\'-m2-top\': usersNEW.length}" ng-show="usersBAN.length">\n' +
    '      <i>Забаненные</i>\n' +
    '      <ul>\n' +
    '        <li ng-repeat="u in usersBAN">\n' +
    '          <div class="-pull-right">\n' +
    '            <a ng-click="aprove(u)" class="pseudo-link -m-right"><i class="mdi mdi-check"></i> OK</a>\n' +
    '            <a ng-click="remove(u.id)" class="pseudo-link -muted"><i class="mdi mdi-window-close"></i> Удалить</a>\n' +
    '          </div>\n' +
    '\n' +
    '          <span class="date">{{u.date | date : "dd.MM.yyyy"}}</span> \n' +
    '          <i class="mdi mdi-account"></i>\n' +
    '          <b>{{u.name}}</b>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '  \n' +
    '  \n' +
    '</div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
