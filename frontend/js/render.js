const targetID = "results-grid";

const missingImg = "img/missing.png";
const emptyField = "";

const cardTag = "article";
const imageTag = "img";
const nameTag = "h3";
const lineTag = "p";

const cardSection = "section";

const cardClass = "card";
const imgClass = "card-img";
const thumbClass = "card-img-thumbnail";
const infoClass = "card-info";
const typeClass = "card-type";

/**
 * Renders given inhalers
 * @param {*} data JSON data containing (filtered) inhalers
 */
export function renderInhalerGrid(data) {
    const renderTarget = document.getElementById(targetID);
    const inhalerList = document.createDocumentFragment();
    
    for (const inhaler of data ) {
        if (inhaler === null) {
            continue;
        }

        const inhalerCard = buildCard(inhaler);
        if (inhalerCard !== null) {
            inhalerList.appendChild(inhalerCard);
        }
    }
    
    renderTarget.replaceChildren(inhalerList);
}

/**
 * Builds single inhaler card for grid
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the inhaler information or null
 */
function buildCard(inhaler) {
    // Article for the card
    const inhalerCard = document.createElement(cardTag);
    inhalerCard.classList.add(cardClass);

    // Create card sections
    const cardImage = buildImageSection(inhaler);
    inhalerCard.appendChild(cardImage);

    const cardInfo = buildInfoSection(inhaler);
    inhalerCard.appendChild(cardInfo);

    return inhalerCard;
}

/**
 * Builds the image section for the inhaler card
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the image section
 */
function buildImageSection(inhaler) {
    const cardImageSection = document.createElement(cardSection);
    cardImageSection.classList.add(imgClass);
    
    const cardImage = document.createElement(imageTag);
    cardImage.classList.add(thumbClass);
    cardImage.src = (inhaler.image_path === null) ? missingImg : inhaler.image_path;

    cardImageSection.appendChild(cardImage);
    return cardImageSection;
}

/**
 * Builds the info section for the inhaler card
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns 
 */
function buildInfoSection(inhaler) {
    const cardInfoSection = document.createElement(cardSection);
    cardInfoSection.classList.add(infoClass);

    // Header from inhaler name
    const infoHeader = document.createElement(nameTag);
    infoHeader.textContent = inhaler.name;
    cardInfoSection.appendChild(infoHeader);

    // Relevant info
    if ("inhaler_brand" in inhaler) {
        const infoBrand = document.createElement(lineTag);
        infoBrand.textContent = inhaler.inhaler_brand.name;
        cardInfoSection.appendChild(infoBrand);
    }    

    const infoColor = document.createElement(lineTag);
    infoColor.textContent = inhaler.colors[0].name;
    cardInfoSection.appendChild(infoColor);

    // TODO: Localisation
    const infoOfficialAge = document.createElement(lineTag);
    infoOfficialAge.textContent = "Virallinen ikä: " + inhaler.official_min_age;
    cardInfoSection.appendChild(infoOfficialAge);

    const infoRecommendedAge = document.createElement(lineTag);
    infoRecommendedAge.textContent = "Suositeltu ikä: " + inhaler.recommended_min_age;
    cardInfoSection.appendChild(infoRecommendedAge);

    // TODO: Intake and coordination
    return cardInfoSection;
}

