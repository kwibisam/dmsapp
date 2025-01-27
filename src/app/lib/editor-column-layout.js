export default class ColumnLayout {
    static get toolbox() {
        return {
            title: 'Layout',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }
    constructor({ data, api }) {
        this.api = api;
        this.data = { columns: [[], []] }; // Default: Two empty columns
        this.wrapper = null;
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('column-layout');

        this.data.columns.forEach((columnData, columnIndex) => {
            const column = document.createElement('div');
            column.classList.add('column');
            column.dataset.index = columnIndex;

            // Render existing blocks
            columnData.forEach((blockData) => {
                const block = this.api.blocks.render(blockData);
                column.appendChild(block.holder);
            });

            // Add button for adding a new block
            const addBlockButton = document.createElement('button');
            addBlockButton.textContent = 'Add Block';
            addBlockButton.addEventListener('click', () => {
                const newBlockData = { type: 'paragraph', data: { text: 'New block content' } };
                this.addBlockToColumn(columnIndex, newBlockData);
            });
            column.appendChild(addBlockButton);

            this.wrapper.appendChild(column);
        });

        return this.wrapper;
    }

    // addColumn() {
    //     this.data.columns.push([]);
    //     const column = document.createElement('div');
    //     column.classList.add('column');
    //     column.dataset.index = this.data.columns.length - 1;
    //     this.wrapper.insertBefore(column, this.wrapper.lastChild); // Add before the button
    // }

    addColumn() {
        this.data.columns.push([]);
        const column = document.createElement('div');
        column.classList.add('column');
        column.dataset.index = this.data.columns.length - 1;

        // Add button for adding a new block
        const addBlockButton = document.createElement('button');
        addBlockButton.textContent = 'Add Block';
        addBlockButton.addEventListener('click', () => {
            const newBlockData = { type: 'paragraph', data: { text: 'New block content' } };
            this.addBlockToColumn(this.data.columns.length - 1, newBlockData);
        });
        column.appendChild(addBlockButton);

        this.wrapper.insertBefore(column, this.wrapper.lastChild); // Add before the button
    }



    // Adds a block to a specific column
    addBlockToColumn(columnIndex, blockData) {
        this.data.columns[columnIndex].push(blockData);

        const column = this.wrapper.querySelector(`[data-index="${columnIndex}"]`);
        const block = this.api.blocks.render(blockData);
        column.appendChild(block.holder);
    }

    // Edits a block in a specific column
    editBlock(columnIndex, blockIndex, newData) {
        this.data.columns[columnIndex][blockIndex] = newData;

        // Optionally re-render the block if necessary
        const column = this.wrapper.querySelector(`[data-index="${columnIndex}"]`);
        const blockHolder = column.children[blockIndex];
        blockHolder.innerHTML = newData; // Update the block's content (simplified example)
    }


    save() {
        return this.data;
    }
}
