import * as React from 'react';
import * as styles from './Board.css';
import BoardComponent from './BoardComponent'
import {rows, cols} from '../../../constants/constants'

interface BoardContainerState {
    figures: Figure[],
    selectedChecker: boolean,
    firstSelectedElem: HTMLTableDataCellElement,
    colorSelectedChecker: string
}

interface Figure {
    value: string,
    color: string,
    row: number,
    col: string,
    isSelect: boolean,
    status: boolean
}

export default class BoardContainer extends React.Component {
    state: BoardContainerState = {
        figures: [
            // white
            {value: '⛀', color: 'white', row: 1, col: 'a', isSelect: false, status: true},
            {value: '⛀', color: 'white', row: 1, col: 'c', isSelect: false, status: true},
            {value: '⛀', color: 'white', row: 1, col: 'e', isSelect: false, status: true},
            {value: '⛀', color: 'white', row: 1, col: 'g', isSelect: false, status: true},
            // black
            {value: '⛂', color: 'black', row: 8, col: 'b', isSelect: false, status: true},
            {value: '⛂', color: 'black', row: 8, col: 'd', isSelect: false, status: true},
            {value: '⛂', color: 'black', row: 8, col: 'f', isSelect: false, status: true},
            {value: '⛂', color: 'black', row: 8, col: 'h', isSelect: false, status: true},
        ],
        selectedChecker: false,
        colorSelectedChecker: 'black',
        firstSelectedElem: null,
    };

    /**
     * Рендерит элементы достки для вставки в <tbody>.
     * @returns массив из JSX элементов <tr> и <td>.
     */
    renderMap = (): JSX.Element[] => {
        return rows.map((tr: number, indexTr: number) => {
            return <tr key={indexTr} className={styles.tr}>
                {cols.map((td: number | string, indexTd: number) => {
                    let cellValue: number | string;
                    const style: string = this.isCellIsBlack(indexTr, indexTd) ? styles.tdBlack : styles.td;

                    if (tr === 0 && td !== 0) {
                        cellValue = td;
                    } else if (td === 0 && tr !== 0) {
                        cellValue = tr.toString();
                    } else if (tr === 0 && td === 0) {
                        cellValue = '';
                    } else {
                        cellValue = this.renderFigures(tr, td);
                    }

                    return <td
                        key={indexTd}
                        className={style}
                        data-row={tr}
                        data-col={td}
                        onClick={this.boardCellClick}
                    >
                        {cellValue}
                    </td>
                })}
            </tr>
        })
    };

    /**
     * Определяет является ли ячейка черной.
     * @param rowNum - номер в строке.
     * @param colNum - номер в колонке.
     * @returns true, если ячейка должна быть черной, иначе false.
     */
    isCellIsBlack = (rowNum: number, colNum: number): boolean => {
        if (rowNum === 0 || colNum === 0 || rowNum === 9 || colNum === 9) {
            return false;
        }

        return (rowNum % 2 === 1 && colNum % 2 === 0) || (rowNum % 2 === 0 && colNum % 2 === 1);
    };

    /**
     * Отображает фигуры на поле.
     * @param row - номер в строке.
     * @param col - номер в колонке.
     * @returns фигуру (белая или черная пешка) на поле.
     */
    renderFigures = (row: number, col: number | string): string => {
        let figureValue: string = '';

        for (const figure of this.state.figures) {
            if (row === figure.row && col === figure.col && figure.status) {
                return figureValue = figure.value
            }
        }

        return figureValue;
    };






    boardCellClick = (event: any): void => {
        const elem: any = event.target;
        const rowElem: number = +elem.getAttribute('data-row');
        const colElem: string = elem.getAttribute('data-col');
        const deleteElem: Figure = this.getDeletedChecker(this.state.figures, rowElem, colElem); // элемент который рубят

        for (let i = 0; i < this.state.figures.length; i++) {
            const figure: Figure = this.state.figures[i];

            // выбор шашки (первое нажатие)
            if (rowElem === figure.row &&
                colElem === figure.col &&
                !this.state.selectedChecker &&
                figure.color !== this.state.colorSelectedChecker
            ) {
                this.getCheckerForMove(i, elem);

            // ход шашки (второе нажатие)
            } else if (
                this.state.selectedChecker &&
                figure.isSelect &&
                elem !== this.state.firstSelectedElem &&
                ((deleteElem && deleteElem.color !== figure.color) || !deleteElem) &&
                !(rowElem === 0 || colElem === '0')
            ) {
                const newStateFigures = this.deleteArrElem(this.state.figures, rowElem, colElem);
                const color = this.state.colorSelectedChecker === 'white' ? 'black' : 'white';

                this.state.firstSelectedElem.classList.remove(`${styles.isSelect}`);


                newStateFigures[i].isSelect = false;
                newStateFigures[i].row = rowElem;
                newStateFigures[i].col = colElem;

                this.setState({
                    figures: newStateFigures,
                    selectedChecker: false,
                    firstSelectedElem: null,
                    colorSelectedChecker: color
                });
            }
        }

    };

    /**
     * Выбирае шашку для дальнейшего хода (первое нажатие).
     * @param index - индекс Figure в массиве шашек.
     * @param elem - элемент на котором произошло действие onClick.
     */
    getCheckerForMove = (index: number, elem: HTMLElement): void => {
        const newStateFigures: Figure[] = this.state.figures;

        newStateFigures[index].isSelect = true;
        elem.classList.add(`${styles.isSelect}`);

        this.setState({
            figures: newStateFigures,
            selectedChecker: true,
            firstSelectedElem: elem
        });
    };


    /**
     * Инициализирует удаление шашки (status = false).
     * @param arrChecker - маассив фигур.
     * @param row - номер в строке.
     * @param col - номер в колонке.
     * @returns обьект Figure.
     */
    deleteArrElem = (arrChecker: Figure[], row: number, col: string): Figure[] => {
        for (let i = 0; i < arrChecker.length; i++) {
            if (arrChecker[i].row === row && arrChecker[i].col === col && arrChecker[i].status) {
                arrChecker[i].status = false;
                arrChecker[i].row = 0;
                arrChecker[i].col = '0';
            }
        }

        return arrChecker;
    };

    /**
     * Возвращает обьект шашки, которую будут рубить.
     * @param arrChecker - маассив фигур.
     * @param row - номер в строке.
     * @param col - номер в колонке.
     * @returns обьект Figure.
     */
    getDeletedChecker = (arrChecker: Figure[], row: number, col: string): Figure | null => {
        let figure: Figure | null = null;

        for (let i = 0; i < arrChecker.length; i++) {
            if (arrChecker[i].row === row && arrChecker[i].col === col) {
                figure = arrChecker[i];
            }
        }

        return figure;
    };

    render() {
        return <BoardComponent table={this.renderMap()} strokeColor={this.state.colorSelectedChecker}/>;
    }
}
