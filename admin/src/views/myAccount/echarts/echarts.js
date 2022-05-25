import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    GridComponent,
} from 'echarts/components';
import {
    PieChart,
    BarChart,

} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';
import {
    LineChart
} from 'echarts/charts';

echarts.use(
    [BarChart,TooltipComponent, LegendComponent, PieChart, CanvasRenderer,TitleComponent,ToolboxComponent,GridComponent,LineChart]
);






export default echarts