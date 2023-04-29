import React from "react";
import * as d3 from "d3";

import useFetch from '../../hooks/useFetch';

function StreamChart({ region, tracks }) {
    const svgRef = React.useRef(null);

    const ids = tracks.map( t => t.id )
        
    const { data, isLoading } = useFetch(`/clean/histories?region=${region}&ids=${ids.join(',')}`)

    // const datasets = useMemo( () => isLoading || data === undefined ?  [] : 
    //     ids.map( (id, i) => ({
    //         label: tracks[i].title,
    //         data: data[id].streams,
    //         borderColor: CHART_COLORS[i],
    //         backgroundColor: CHART_COLORS[i]
    //     }) )
    // , [tracks, ids, data, isLoading] )

    const labels = ["January", "February", "March", "April", "May", "June", "July"];

    const height = 500;
    const width = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    React.useEffect(() => {
        if ( data === undefined ) return;
        const a = Object.values(data).map( t => t.dates ).flat();
        const b = [...new Set(a)].sort()
        console.log(b);
        console.log(data);
        
        const yMinValue = d3.min(data, d => d.value);
        const yMaxValue = d3.max(data, d => d.value);
        const xMinValue = b[0]
        const xMaxValue = b[b.length - 1]

        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, yMaxValue]);

        const line = d3
            .line()
            .x(d => xScale(d.label))
            .y(d => yScale(d.value))    
            .curve(d3.curveMonotoneX);

        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call( d3
                .axisBottom(xScale)
                .tickSize(-height)
                .tickFormat(''),
            );

        svg
            .append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale)
                .tickSize(-width)
                .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom().scale(xScale).tickSize(15));
        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line') 
            .attr('d', line);
    }, [data]);

    return (
        <svg ref={svgRef} style={{
            height: 500,
            width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
        }} />
    );
}

export default StreamChart;