angular.module('reactPOC')
    .factory('TableRenderFactory', [
        'React',
        function TableRenderFactory(
            React
        ) {

            var TableRendered = React.createClass({
                propTypes: {
                    data: React.PropTypes.array.isRequired
                },
                render: function() {
                    return (
                        <div>
                            <table>
                                <tbody>
                                {this.props.data.map(function (row, i) {
                                    return (
                                        <tr key={i}>
                                            {row.map(function (cell, j) {
                                                return <td key={j}>{cell}</td>;
                                            })}
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    );
                }
            });

            return TableRendered;
        }]);