// Array que armazenará os itens do menu - inicializado com valores padrão
let menuItems = ["Home", "Produtos", "Serviços", "Sobre", "Contato"];

// Captura elementos do DOM - obtém referências a todos os elementos HTML necessários
const addItemButton = document.getElementById("add-item-button");       // Botão para adicionar novo item
const updateButton = document.getElementById("update-button");          // Botão para atualizar a visualização
const itemsContainer = document.getElementById("items-container");      // Container que exibe a lista de itens
const menuPreview = document.getElementById("menu-preview");            // Container de pré-visualização do menu
const menuImageInput = document.getElementById("menu-image");           // Input para upload de imagem
const borderWidthInput = document.getElementById("border-width");       // Controle de largura da borda
const borderWidthValue = document.getElementById("border-width-value"); // Exibe o valor da largura da borda
const menuTitleInput = document.getElementById("menu-title");           // Input para o título do menu
const backgroundColorInput = document.getElementById("background-color"); // Seletor de cor de fundo
const textColorInput = document.getElementById("text-color");           // Seletor de cor do texto
const hoverColorInput = document.getElementById("hover-color");         // Seletor de cor de hover
const menuWidthInput = document.getElementById("menu-width");           // Input para largura do menu
const itemSpacingInput = document.getElementById("item-spacing");       // Input para espaçamento entre itens
const fontSizeInput = document.getElementById("font-size");             // Input para tamanho da fonte
const newItemInput = document.getElementById("new-item");               // Input para adicionar novo item
const borderRadiusInput = document.getElementById("border-radius");     // Controle de arredondamento das bordas
const borderRadiusValue = document.getElementById("border-radius-value"); // Exibe o valor do arredondamento
const borderColorInput = document.getElementById("border-color");       // Seletor de cor da borda

/**
 * Renderiza a lista de itens do menu no painel de edição
 * Cria visualmente a lista de itens com botões para removê-los
 */
function renderItemList() {
    // Limpa o container antes de adicionar os itens
    itemsContainer.innerHTML = "";
    
    // Percorre o array de itens e cria a interface para cada um
    menuItems.forEach((item, index) => {
        // Cria uma linha (container) para o item
        const row = document.createElement("div");
        row.classList.add("item-row");
        
        // Cria o elemento que exibe o texto do item
        const itemText = document.createElement("div");
        itemText.classList.add("item-text");
        itemText.textContent = item;
        
        // Cria o botão para remover o item
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("btn", "btn-danger", "btn-sm");
        
        // Adiciona o evento de clique para remover o item
        removeButton.addEventListener("click", () => {
            removeItem(index);
        });
        
        // Adiciona os elementos à linha e a linha ao container
        row.appendChild(itemText);
        row.appendChild(removeButton);
        itemsContainer.appendChild(row);
    });
}

/**
 * Remove um item do array de itens do menu
 * @param {number} index - Índice do item a ser removido
 */
function removeItem(index) {
    // Remove o item do array pelo índice
    menuItems.splice(index, 1);
    
    // Atualiza a interface
    renderItemList();
    updateMenuPreview();
}

/**
 * Adiciona um novo item ao menu
 * Obtém o texto do input e adiciona ao array de itens
 */
function addItem() {
    // Obtém o texto do input e remove espaços extras
    const newItem = newItemInput.value.trim();
    
    // Só adiciona se houver texto
    if (newItem) {
        // Adiciona ao array
        menuItems.push(newItem);
        
        // Limpa o input
        newItemInput.value = "";
        
        // Atualiza a interface
        renderItemList();
        updateMenuPreview();
    }
}

/**
 * Atualiza a pré-visualização do menu com todas as configurações atuais
 * Esta é a função principal que reflete as mudanças no editor para a pré-visualização
 */
function updateMenuPreview() {
    // Limpa o conteúdo atual da pré-visualização
    menuPreview.innerHTML = "";
    
    // Referência à imagem de pré-visualização
    const previewImage = document.getElementById("preview-image");
    
    // Verifica se há uma imagem selecionada
    if (menuImageInput.files.length > 0) {
        // Cria um FileReader para ler o arquivo como uma URL de dados
        const reader = new FileReader();
        
        // Define o que acontece quando a leitura terminar
        reader.onload = function(e) {
            // Define a fonte da imagem e a torna visível
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        
        // Inicia a leitura do arquivo
        reader.readAsDataURL(menuImageInput.files[0]);
    } else {
        // Se não houver imagem, oculta o elemento
        previewImage.style.display = 'none';
    }
    
    // Define a borda do menu
    menuPreview.style.border = `${borderWidthInput.value}px solid ${borderColorInput.value}`;
    
    // Cria e configura o título do menu
    const title = document.createElement("div");
    title.classList.add("menu-title");
    title.textContent = menuTitleInput.value;
    menuPreview.appendChild(title);
    
    // Cria a lista de itens do menu
    const ul = document.createElement("ul");
    ul.classList.add("menu-list");
    ul.style.display = "flex";
    ul.style.gap = itemSpacingInput.value + "px";
    
    // Adiciona cada item à lista
    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
        
        // Adiciona efeito de hover nos itens
        li.addEventListener("mouseenter", () => {
            li.style.backgroundColor = hoverColorInput.value;
        });
        li.addEventListener("mouseleave", () => {
            li.style.backgroundColor = backgroundColorInput.value;
        });
    });
    
    // Adiciona a lista ao menu
    menuPreview.appendChild(ul);
    
    // Aplica todas as configurações de estilo ao menu
    menuPreview.style.backgroundColor = backgroundColorInput.value;
    menuPreview.style.width = menuWidthInput.value + "px";
    menuPreview.style.color = textColorInput.value;
    menuPreview.style.fontSize = fontSizeInput.value + "px";
    menuPreview.style.borderRadius = borderRadiusInput.value + "px";
    menuPreview.style.borderWidth = `${borderWidthInput.value}px`;
    
    // Atualiza o texto que mostra o valor da largura da borda
    borderWidthValue.textContent = `${borderWidthInput.value}px`;
}

// Adiciona os eventos de clique aos botões
addItemButton.addEventListener("click", addItem);
updateButton.addEventListener("click", updateMenuPreview);

// Atualiza a pré-visualização quando a imagem mudar
menuImageInput.addEventListener("change", updateMenuPreview);

// Atualiza a pré-visualização quando a cor da borda mudar
borderColorInput.addEventListener("input", updateMenuPreview);

// Inicializa a interface quando o DOM estiver pronto
window.addEventListener("DOMContentLoaded", () => {
    // Renderiza a lista de itens
    renderItemList();
    
    // Atualiza a pré-visualização
    updateMenuPreview();
    
    // Inicializa os textos de valores
    borderRadiusValue.textContent = borderRadiusInput.value + "px";
    borderWidthValue.textContent = borderWidthInput.value + "px";
});

// Efeito de scroll para o menu (mantém a pré-visualização visível durante o scroll)
window.addEventListener("scroll", () => {
    const menuContainer = document.getElementById("menu-container");
    const scrollPosition = window.scrollY;
    menuContainer.style.transform = `translateY(${scrollPosition}px)`;
});

// Adiciona eventos de input para todos os controles de personalização
// Este array contém todos os inputs que afetam a aparência do menu
[
    menuTitleInput,
    backgroundColorInput,
    textColorInput,
    hoverColorInput,
    menuWidthInput,
    itemSpacingInput,
    fontSizeInput,
    borderRadiusInput,
    borderWidthInput
].forEach(input => {
    // Adiciona o evento de input para cada elemento
    input.addEventListener("input", function() {
        // Atualiza os textos de valores para os controles deslizantes
        if (this.id === "border-radius") {
            borderRadiusValue.textContent = this.value + "px";
        } else if (this.id === "border-width") {
            borderWidthValue.textContent = this.value + "px";
        }
        
        // Atualiza a pré-visualização em tempo real
        updateMenuPreview();
    });
});
