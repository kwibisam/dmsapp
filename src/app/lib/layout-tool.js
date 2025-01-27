export default class LayoutTool {
    static get toolbox() {
        return {
            title: 'Layout',
            icon: '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" fill="currentColor"/></svg>',
        };
    }

    constructor({ data, api, config }) {
        this.api = api;
        this.config = config;
        this.data = { items: [] }; // Holds child tools' data
        this.container = null; // Main container element
    }

    render() {
        this.container = document.createElement('div');
        this.container.classList.add('layout-tool');
        // Add a button to add child tools
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Tool';
        addButton.classList.add('layout-tool__add-button');
        addButton.addEventListener('click', () => this.addChildTool());

        // Append existing child tools
        this.data.items.forEach((item) => this.renderChildTool(item));

        this.container.appendChild(addButton);
        return this.container;
    }

    async addChildTool() {
        const toolName = prompt('Enter tool name (e.g., image, header):'); // Simplified for example
        console.log("the class: ", this.api.tools.getBlockTools()[3])
        if (toolName && this.api.tools.getBlockTools()[3]) {
            const toolClass = this.api.tools.getBlockTools()[3].constructable;
            console.log("tool class: ", toolClass)
            const toolInstance = new toolClass({
                api: this.api,
                config: this.api.tools.getBlockTools()[3].config || {},
                data: {},
            });

            const toolData = { type: toolName, data: {} };
            this.data.items.push(toolData);

            // Render the tool
            const childContainer = document.createElement('div');
            childContainer.classList.add('layout-tool__child');
            const toolElement = toolInstance.render();
            childContainer.appendChild(toolElement);
            this.container.insertBefore(childContainer, this.container.lastChild); // Add before the Add button
        } else {
            alert('Tool not found!');
        }
    }

    renderChildTool(toolData) {
        const toolClass = this.api.tools[toolData.type].class;
        const toolInstance = new toolClass({
            api: this.api,
            config: this.api.tools[toolData.type].config || {},
            data: toolData.data,
        });

        const childContainer = document.createElement('div');
        childContainer.classList.add('layout-tool__child');
        const toolElement = toolInstance.render();
        childContainer.appendChild(toolElement);

        childContainer.appendChild(configureButton);
        this.container.insertBefore(childContainer, this.container.lastChild); // Add before the Add button
    }
    save() {
        return {
            items: this.data.items,
        };
    }

    renderSettings() {
        // Create a container for settings
        const settingsContainer = document.createElement('div');
        settingsContainer.classList.add('layout-tool__settings');

        // Example: Add a button to clear all child tools
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear All Tools';
        clearButton.classList.add('layout-tool__settings-button');
        clearButton.addEventListener('click', () => {
            this.data.items = [];
            this.container.innerHTML = ''; // Clear the rendered layout
            this.api.blocks.stretchBlock(this.api.blocks.getCurrentBlockIndex()); // Refresh block display
        });

        // Example: Add a toggle for layout orientation (e.g., horizontal/vertical)
        const orientationLabel = document.createElement('label');
        orientationLabel.textContent = 'Orientation:';

        const orientationSelect = document.createElement('select');
        const options = ['Horizontal', 'Vertical'];
        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase();
            opt.textContent = option;
            orientationSelect.appendChild(opt);
        });

        orientationSelect.value = this.data.orientation || 'horizontal';
        orientationSelect.addEventListener('change', (event) => {
            this.data.orientation = event.target.value;
            this.container.style.flexDirection = this.data.orientation === 'vertical' ? 'column' : 'row';
        });

        settingsContainer.appendChild(clearButton);
        settingsContainer.appendChild(orientationLabel);
        settingsContainer.appendChild(orientationSelect);

        return settingsContainer;
    }
}
