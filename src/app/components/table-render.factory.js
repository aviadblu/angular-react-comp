angular.module('reactPOC')
    .factory('TableRenderFactory', [
        'React',
        function TableRenderFactory(
            React
        ) {

            var TableRendered = React.createClass({displayName: "TableRendered",
                propTypes: {
                    data: React.PropTypes.array.isRequired
                },
                render: function() {
                    return (
                        React.createElement("div", null, 
                            React.createElement("table", null, 
                                React.createElement("tbody", null, 
                                this.props.data.map(function (row, i) {
                                    return (
                                        React.createElement("tr", {key: i}, 
                                            row.map(function (cell, j) {
                                                return React.createElement("td", {key: j}, cell);
                                            })
                                        )
                                    );
                                })
                                )
                            )
                        )
                    );
                }
            });

            return TableRendered;
        }]);