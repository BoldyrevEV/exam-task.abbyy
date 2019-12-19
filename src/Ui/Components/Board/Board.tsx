import * as React from 'react';
import * as styles from './Board.css';
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
    isDelete: boolean
}

enum Checker {
    whiteValue = '⛀',
    blackValue = '⛂',
    whiteColor = 'white',
    blackColor = 'black',
}

export default class Board extends React.Component {
    state: BoardContainerState = {
        figures: [
            // white
            {value: Checker.whiteValue, color: Checker.whiteColor, row: 1, col: 'a', isSelect: false, isDelete: false},
            {value: Checker.whiteValue, color: Checker.whiteColor, row: 1, col: 'c', isSelect: false, isDelete: false},
            {value: Checker.whiteValue, color: Checker.whiteColor, row: 1, col: 'e', isSelect: false, isDelete: false},
            {value: Checker.whiteValue, color: Checker.whiteColor, row: 1, col: 'g', isSelect: false, isDelete: false},
            // black
            {value: Checker.blackValue, color: Checker.blackColor, row: 8, col: 'b', isSelect: false, isDelete: false},
            {value: Checker.blackValue, color: Checker.blackColor, row: 8, col: 'd', isSelect: false, isDelete: false},
            {value: Checker.blackValue, color: Checker.blackColor, row: 8, col: 'f', isSelect: false, isDelete: false},
            {value: Checker.blackValue, color: Checker.blackColor, row: 8, col: 'h', isSelect: false, isDelete: false},
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
        return rows.map((rowNum: number, indexTr: number) => {
            return <tr key={indexTr} className={styles.tr}>
                {cols.map((colNum: number | string, indexTd: number) => {
                    const style: string = this.isCellIsBlack(indexTr, indexTd) ? styles.tdBlack : styles.td;
                    const cellValue: number | string = this.setCellValue(rowNum, colNum);

                    return <td
                        key={indexTd}
                        className={style}
                        data-row={rowNum}
                        data-col={colNum}
                        onClick={this.boardCellClick}
                    >
                        {cellValue}
                    </td>
                })}
            </tr>
        })
    };

    /**
     * Определяет значение ячейки.
     * @param rowNum - номер в строке.
     * @param colNum - номер в колонке.
     * @returns значение ячейки.
     */
    setCellValue = (rowNum: number, colNum: number | string): number | string => {
        let cellValue: number | string;

        if (rowNum === 0 && colNum !== 0) {
            cellValue = colNum;
        } else if (colNum === 0 && rowNum !== 0) {
            cellValue = rowNum.toString();
        } else if (rowNum === 0 && colNum === 0) {
            cellValue = '';
        } else {
            cellValue = this.renderFigures(rowNum, colNum);
        }

        return cellValue;
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
            if (row === figure.row && col === figure.col && !figure.isDelete) {
                return figureValue = figure.value
            }
        }

        return figureValue;
    };

    /**
     * Обработчик onClick на доске.
     * @param event
     */
    boardCellClick = (event: React.MouseEvent<HTMLTableDataCellElement>): void => {
        const elem = event.target as HTMLTableDataCellElement;
        const rowElem: number = +elem.getAttribute('data-row');
        const colElem: string = elem.getAttribute('data-col');
        const deleteElem: Figure = this.getDeletedChecker(this.state.figures, rowElem, colElem);

        for (let i = 0; i < this.state.figures.length; i++) {
            const figure: Figure = this.state.figures[i];

            // выбор шашки (первое нажатие)
            if (rowElem === figure.row &&
                colElem === figure.col &&
                !this.state.selectedChecker &&
                figure.color !== this.state.colorSelectedChecker
            ) {
                this.selectCheckerForMove(i, elem);

            // ход шашки (второе нажатие)
            } else if (
                this.state.selectedChecker &&
                figure.isSelect &&
                elem !== this.state.firstSelectedElem &&
                ((deleteElem && deleteElem.color !== figure.color) || !deleteElem) &&
                !(rowElem === 0 || colElem === '0')
            ) {
                this.moveChecker(i, rowElem, colElem);
            }
        }
    };

    /**
     * Выбирае шашку для дальнейшего хода (первое нажатие).
     * @param index - индекс Figure в массиве шашек.
     * @param elem - элемент на котором произошло действие onClick.
     */
    selectCheckerForMove = (index: number, elem: HTMLElement): void => {
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
     * Перемещает шашку на выбранное поле.
     * @param index - индекс Figure в массиве шашек.
     * @param row - номер в строке.
     * @param col - номер в колонке.
     */
    moveChecker = (index: number, row: number, col: string): void => {
        const newStateFigures: Figure[] = this.deleteArrElem(this.state.figures, row, col);
        const color: string = this.state.colorSelectedChecker === 'white' ? 'black' : 'white';

        this.state.firstSelectedElem.classList.remove(`${styles.isSelect}`);

        newStateFigures[index].isSelect = false;
        newStateFigures[index].row = row;
        newStateFigures[index].col = col;

        this.setState({
            figures: newStateFigures,
            selectedChecker: false,
            firstSelectedElem: null,
            colorSelectedChecker: color
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
            if (arrChecker[i].row === row && arrChecker[i].col === col && !arrChecker[i].isDelete) {
                arrChecker[i].isDelete = true;
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
        return (
            <div>
                <p className={styles.mainText}>Checkers</p>
                <table className={styles.table}>
                    <tbody>
                    {this.renderMap()}
                    </tbody>
                </table>
                <div className={styles.inf}>
                    <p className={styles.infText}>Player move: </p>
                    <p className={
                        this.state.colorSelectedChecker !== 'white' ?
                        styles.infColorGray :
                        styles.infColorBlack
                    }>
                    </p>
                </div>
            </div>
        );
    }
}
