var app = angular.module("reactPOC", []);

app.controller("appCtrl", function ($scope, $compile, $timeout, $templateRequest) {
    var ctrl = this;
    var templateUrl, startTime, timePassed;
    ctrl.rows = 100;
    ctrl.renderingTime = null;
    ctrl.working = false;
    ctrl.viewEngine = null;

    ctrl.DOMReady = function () {
        $timeout(function () {
            var now = new Date().getTime();
            timePassed = (now - startTime) / 1000;
            console.info("done: " + now);
            ctrl.renderingTime = timePassed;
            ctrl.working = false;
        }, 0);
    };

    function clean() {
        document.getElementById("contentWrap").innerHTML = "";
        ctrl.data = [];
        ctrl.renderingTime = null;
    }

    function render(viewEngine) {
        clean();
        ctrl.working = true;
        ctrl.viewEngine = viewEngine;
        $timeout(function () {
            startTime = new Date().getTime();
            console.info("start: " + startTime);
            var data = [];
            for (var i = 0; i < ctrl.rows; i++) {
                data.push([
                    "col_" + i + "_1",
                    "col_" + i + "_2",
                    "col_" + i + "_3",
                    "col_" + i + "_4",
                    "col_" + i + "_5",
                    "col_" + i + "_6",
                    "col_" + i + "_7",
                    "col_" + i + "_8",
                    "col_" + i + "_9",
                    "col_" + i + "_10"
                ]);
            }

            ctrl.data = data;
            templateUrl = viewEngine + "ViewRendering.html";
            $templateRequest(templateUrl).then(function (htmlContent) {
                htmlContent += '<span dom-ready="ctrl.DOMReady()"></span>';
                $compile(angular.element(document.getElementById("contentWrap")).html(htmlContent).contents())($scope);
            });
        }, 0);

    }

    ctrl.render = render;
    ctrl.clean = clean;

});

app.value('React', window.React);
app.value('ReactDOM', window.ReactDOM);

app.directive('domReady', [function () {
    return {
        priority: 1001, // make sure it's the last to run
        scope: {
            domReady: '&'
        },
        link: function (scope) {
            scope.domReady();
        }
    };
}]);

app.directive('tableRender', [
    'React',
    'ReactDOM',
    'TableRenderFactory',
    function tableRender(React,
                            ReactDOM,
                            TableRenderFactory) {
        'use strict';

        return {
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function (scope, element) {

                function renderReactElement() {
                    if (!scope.data) {
                        return;
                    }

                    var props = {
                        data: scope.data
                    };

                    ReactDOM.render(
                        React.createElement(TableRenderFactory, props),
                        element[0]
                    );

                }

                function unmountReactElement() {
                    React.unmountComponentAtNode(element[0]);
                }

                scope.$watch('data', renderReactElement);

                scope.$on('$destroy', unmountReactElement);

            }
        };
    }]);