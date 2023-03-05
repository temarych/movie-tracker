import styled from "styled-components";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IGetMovieResponse } from "@typings/moviedb/responses";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";

ChartJS.register(...registerables);

export interface BarChartProps {
  movies: IGetMovieResponse[];
}

export const removeDuplicates = <T,>(array: T[]): T[] => Array.from(new Set(array));

export interface IDuplicateOccurence<T> {
  item: T;
  times: number;
}

export const getDuplicateOccurences = <T,>(array: T[]): IDuplicateOccurence<T>[] => {
  const uniqueItems = removeDuplicates(array);

  const duplicateOccurences = uniqueItems.map(item => {
    const times = array.reduce((acc, cur) => cur === item ? ++acc : acc, 0);
    return { item, times };
  });

  return duplicateOccurences;
}

export const BarChart = (props: BarChartProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  const genres = props.movies.flatMap(movie => movie.genres);
  const genreNames = genres.map(genre => genre.name);

  const genreOccurences = getDuplicateOccurences(genreNames);

  return (
    <BarChart.Wrapper>
      <BarChart.Container>
        <Bar 
          data={{
            labels: genreOccurences.map(genreOccurence => genreOccurence.item),
            datasets: [{
              data: genreOccurences.map(genreOccurence => genreOccurence.times),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
              barPercentage: 0.7
            }]
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                border: {
                  color: mode === "light" ? "#f2f2f2" : "#282828"
                },
                grid: {
                  color: mode === "light" ? "#f2f2f2" : "#282828"
                }
              },
              y: {
                border: {
                  color: mode === "light" ? "#f2f2f2" : "#282828"
                },
                grid: {
                  color: mode === "light" ? "#f2f2f2" : "#282828"
                }
              }
            }
          }}
        />
      </BarChart.Container>
    </BarChart.Wrapper>
  );
}

BarChart.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

BarChart.Wrapper = styled.div`
  position: relative;
  aspect-ratio: 2.5;
  width: 100%;
`;