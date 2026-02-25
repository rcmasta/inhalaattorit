const targetID = "results-grid";

const missingImg = "img/missing.png";
const emptyField = "";

const inhalerTag = "article";
const inhalerSection = "section";
const imageTag = "img";
const nameTag = "h3";
const lineTag = "p";

const detailClass = "detail-view";
const detailImgClass = "detail-view-img";
const detailInfoClass = "detail-view-info";
const cardClass = "card";
const cardImgClass = "card-img";
const cardInfoClass = "card-info";
const cardTypeClass = "card-type";
const thumbClass = "card-img-thumbnail";
const hiddenClass = "hidden";

const ariaHidden = "aria-hidden"

/**
 * Renders given inhalers
 * @param {*} data JSON data containing (filtered) inhalers
 */
export function renderInhalerGrid(data) {
    const renderTarget = document.getElementById(targetID);
    const inhalerList = document.createDocumentFragment();
    
    // Build cards for each inhaler
    for (const inhaler of data ) {
        if (inhaler === null) {
            continue;
        }

        const inhalerCard = buildCard(inhaler);
        if (inhalerCard !== null) {
            inhalerCard.addEventListener("click", (event) => {
                renderInhalerDetails(inhaler);
            });
            inhalerList.appendChild(inhalerCard);
        }
    }
    
    disableBackButton();
    renderTarget.replaceChildren(inhalerList);
}

/**
 * Renders detailed view of given inhaler
 * @param {*} inhaler JSON object containing the inhaler
 */
function renderInhalerDetails(inhaler) {
    const renderTarget = document.getElementById(targetID);
    const inhalerDetails = document.createDocumentFragment();

    // Create detailed view
    const inhalerView = buildDetailView(inhaler);
    if (typeof inhalerView !== "undefined") {
        inhalerDetails.appendChild(inhalerView);
        renderTarget.replaceChildren(inhalerDetails);
    }

    enableBackButton();

    // DEBUG
    console.log("Clicked inhaler card");
    console.log(inhaler);
    console.log(inhalerView);

}

/**
 * Builds single inhaler card for grid
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the inhaler card
 */
function buildCard(inhaler) {
    // Article for the card
    const inhalerCard = document.createElement(inhalerTag);
    inhalerCard.classList.add(cardClass);

    // Create card sections
    const cardImage = buildCardImageSection(inhaler);
    inhalerCard.appendChild(cardImage);

    const cardInfo = buildCardInfoSection(inhaler);
    inhalerCard.appendChild(cardInfo);

    return inhalerCard;
}

/**
 * Builds the image section for the inhaler card
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the image section
 */
function buildCardImageSection(inhaler) {
    const cardImageSection = document.createElement(inhalerSection);
    cardImageSection.classList.add(cardImgClass);
    
    const cardImage = document.createElement(imageTag);
    cardImage.classList.add(thumbClass);
    cardImage.src = (inhaler.image_path === null) ? missingImg : inhaler.image_path;

    cardImageSection.appendChild(cardImage);
    return cardImageSection;
}

/**
 * Builds the info section for the inhaler card
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the info section
 */
function buildCardInfoSection(inhaler) {
    const cardInfoSection = document.createElement(inhalerSection);
    cardInfoSection.classList.add(cardInfoClass);

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

/**
 * Build detailed information view for inhaler
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the inhaler information
 */
function buildDetailView(inhaler) {
    const detailView = document.createElement(inhalerTag);
    detailView.classList.add(detailClass);

    // Create detail view sections
    const detailImage = buildDetailImageSection(inhaler);
    detailView.appendChild(detailImage);

    const detailInfo = buildDetailInfoSection(inhaler);
    detailView.appendChild(detailInfo);

    return detailView;
}

/**
 * Builds the image section for the inhaler detail view
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the image section
 */
function buildDetailImageSection(inhaler) {
    const detailImageSection = document.createElement(inhalerSection);
    detailImageSection.classList.add(detailImgClass);

    // TODO: Add proper image
    const detailImage = document.createElement(imageTag);
    detailImage.src = "img/placeholder.jpg";
    detailImageSection.appendChild(detailImage);

    return detailImageSection;
}

/**
 * Builds the info section for the inhaler detail view
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the info section
 */
function buildDetailInfoSection(inhaler) {
    const detailImageSection = document.createElement(inhalerSection);
    detailImageSection.classList.add(detailInfoClass);

    // Header from inhaler name
    const infoHeader = document.createElement(nameTag);
    infoHeader.textContent = inhaler.name;
    detailImageSection.appendChild(infoHeader);

    // Relevant info
    if ("inhaler_brand" in inhaler) {
        const infoBrand = document.createElement(lineTag);
        infoBrand.textContent = inhaler.inhaler_brand.name;
        detailImageSection.appendChild(infoBrand);
    }    

    const infoColor = document.createElement(lineTag);
    infoColor.textContent = inhaler.colors[0].name;
    detailImageSection.appendChild(infoColor);

    // TODO: Localisation
    const infoOfficialAge = document.createElement(lineTag);
    infoOfficialAge.textContent = "Virallinen ikä: " + inhaler.official_min_age;
    detailImageSection.appendChild(infoOfficialAge);

    const infoRecommendedAge = document.createElement(lineTag);
    infoRecommendedAge.textContent = "Suositeltu ikä: " + inhaler.recommended_min_age;
    detailImageSection.appendChild(infoRecommendedAge);

    return detailImageSection;
}

function enableBackButton() {
    const backButton = document.getElementById("return-to-gridview");
    backButton.classList.remove(hiddenClass);
    backButton.setAttribute(ariaHidden, "false");
}

function disableBackButton() {
    const backButton = document.getElementById("return-to-gridview");
    backButton.classList.add(hiddenClass);
    backButton.setAttribute(ariaHidden, "true");
}