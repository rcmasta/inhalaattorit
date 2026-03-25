const targetID = "results-grid";

const missingImg = "img/missing.png";

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
const hiddenClass = "hidden";
const backButtonId = "return-to-gridview";

const ariaHiddenAttribute = "aria-hidden"
const ariaStateVisible = "false"
const ariaStateHidden = "true"

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
    
    setBackButtonVisibility(false);
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

    setBackButtonVisibility(true);
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
    const cardImage = buildImageSection(inhaler, true);
    inhalerCard.appendChild(cardImage);

    const cardInfo = buildCardInfoSection(inhaler);
    inhalerCard.appendChild(cardInfo);

    return inhalerCard;
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
    const detailImage = buildImageSection(inhaler, false);
    detailView.appendChild(detailImage);

    const detailInfo = buildDetailInfoSection(inhaler);
    detailView.appendChild(detailInfo);

    return detailView;
}

/**
 * Builds the info section for the inhaler detail view
 * @param {*} inhaler JSON object containing the inhaler information
 * @returns HTML element containing the info section
 */
function buildDetailInfoSection(inhaler) {
    const detailInfoSection = document.createElement(inhalerSection);
    detailInfoSection.classList.add(detailInfoClass);

    // Header from inhaler name
    const infoHeader = document.createElement(nameTag);
    infoHeader.textContent = inhaler.name;
    detailInfoSection.appendChild(infoHeader);

    // Relevant info
    if ("inhaler_brand" in inhaler) {
        const infoBrand = document.createElement(lineTag);
        infoBrand.textContent = inhaler.inhaler_brand.name;
        detailInfoSection.appendChild(infoBrand);
    }    

    const infoColor = document.createElement(lineTag);
    infoColor.textContent = inhaler.colors[0].name;
    detailInfoSection.appendChild(infoColor);

    // TODO: Localisation
    const infoOfficialAge = document.createElement(lineTag);
    infoOfficialAge.textContent = "Virallinen ikä: " + inhaler.official_min_age;
    detailInfoSection.appendChild(infoOfficialAge);

    const infoRecommendedAge = document.createElement(lineTag);
    infoRecommendedAge.textContent = "Suositeltu ikä: " + inhaler.recommended_min_age;
    detailInfoSection.appendChild(infoRecommendedAge);

    return detailInfoSection;
}

/**
 * Builds the image section for inhaler cards and detail view
 * @param {*} inhaler Inhaler JSON object
 * @param {*} isGridView If true, render card thumbnail, else full image
 * @returns 
 */
function buildImageSection(inhaler, isGridView) {
    const imageSection = document.createElement(inhalerSection);
    imageSection.classList.add(isGridView ? cardImgClass : detailImgClass);
    buildImage(inhaler, imageSection, isGridView);

    return imageSection;
}

/**
 * Builds the image element, and adds it to a parent
 * @param {*} inhaler Inhaler JSON object
 * @param {*} parent The parent element to add the image to
 * @param {*} isThumbnail Is the image a thumbnail
 */
function buildImage(inhaler, parent, isThumbnail) {
    const image = document.createElement(imageTag);
    image.src = isThumbnail
        ? "/uploads/thumb/" + inhaler.id + ".jpeg"
        : "/uploads/full/" + inhaler.id + ".jpeg";

    image.onerror = function () {
        this.onerror = null;
        this.src = missingImg;
    };

    parent.appendChild(image);
}

/**
 * Sets the back button visibility
 * @param {*} visible If true, then show the button, else hide.
 */
function setBackButtonVisibility(visible) {
    const backButton = document.getElementById(backButtonId);

    if (visible) {
        // Show button
        backButton.classList.remove(hiddenClass);
        backButton.setAttribute(ariaHiddenAttribute, ariaStateVisible);
    } else {
        // Hide button
        backButton.classList.add(hiddenClass);
        backButton.setAttribute(ariaHiddenAttribute, ariaStateHidden);
    }
}