export const gridID = "results-grid";
export const detailID = "detail-view";
export const backButtonID = "return-to-gridview";
import { getTranslation } from './lang.js';

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

const ariaHiddenAttribute = "aria-hidden"
const ariaStateVisible = "false"
const ariaStateHidden = "true"

/**
 * Renders given inhalers
 * @param {*} data JSON data containing (filtered) inhalers
 */
export function renderInhalerGrid(data) {
    const renderTarget = document.getElementById(gridID);
    const inhalerList = document.createDocumentFragment();
    
    // Build cards for each inhaler
    for (const inhaler of data ) {
        if (inhaler === null) {
            continue;
        }

        const inhalerCard = buildCard(inhaler);
        if (inhalerCard !== null) {
            inhalerCard.id = inhaler.id;
            inhalerCard.addEventListener("click", (event) => {
                renderInhalerDetails(inhaler);
            });
            inhalerList.appendChild(inhalerCard);
        }
    }
    
    setElementVisibility(backButtonID, false);
    setElementVisibility(detailID, false);
    setElementVisibility(gridID, true);
    renderTarget.replaceChildren(inhalerList);
}

/**
 * Sets element visibility
 * @param {*} elementId HTML id of the element
 * @param {*} visible Sets element visible if true, hides if false
 */
export function setElementVisibility(elementId, visible) {
    const element = document.getElementById(elementId);
    element.hidden = !visible;
}

/**
 * Renders detailed view of given inhaler
 * @param {*} inhaler JSON object containing the inhaler
 */
function renderInhalerDetails(inhaler) {
    const renderTarget = document.getElementById(detailID);
    const inhalerDetails = document.createDocumentFragment();

    // Create detailed view
    const inhalerView = buildDetailView(inhaler);
    if (typeof inhalerView !== "undefined") {
        inhalerDetails.appendChild(inhalerView);
        renderTarget.replaceChildren(inhalerDetails);
    }

    setElementVisibility(backButtonID, true);
    setElementVisibility(detailID, true);
    setElementVisibility(gridID, false);
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
    // If the inhaler is with extention, add a badge to the header
    for (const style of inhaler.intake_styles) {
        if (style.intake_style_id === 5) {
            const extBadge = document.createElement("span");
            extBadge.classList.add("inhaler-extension-badge");
            extBadge.textContent = getTranslation("card.extension-badge");
            infoHeader.appendChild(extBadge);
            break;
        }
    }
    
    // Relevant info
    if ("inhaler_brand" in inhaler) {
        const infoBrand = document.createElement(lineTag);
        infoBrand.textContent = inhaler.inhaler_brand.name;
        cardInfoSection.appendChild(infoBrand);
    }    

    const infoRecommendedAge = document.createElement(lineTag);
    infoRecommendedAge.textContent = getTranslation("card.recommended-age") + inhaler.recommended_min_age;
    cardInfoSection.appendChild(infoRecommendedAge);

    const infoActiveIngrediend = document.createElement(lineTag);
    infoActiveIngrediend.style.whiteSpace = "pre-line";
    infoActiveIngrediend.textContent = getTranslation("card.active-ingredients") + inhaler.active_ingredients.map(ing => ing.name).join(', ');
    cardInfoSection.appendChild(infoActiveIngrediend);

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
    const infoHeader = document.createElement("h2");
    infoHeader.textContent = inhaler.name;
    
    for (const style of inhaler.intake_styles) {
        if (style.intake_style_id === 5) {
            const extBadge = document.createElement("span");
            extBadge.classList.add("inhaler-extension-badge");
            extBadge.textContent = getTranslation("detail.extension-badge");
            infoHeader.appendChild(extBadge);
            break;
        }
    }
    detailInfoSection.appendChild(infoHeader);
    
    // Color badge
    if (inhaler.colors && inhaler.colors.length > 0) {
        const colorBadge = document.createElement("span");
        colorBadge.classList.add("inhaler-color-badge");
        colorBadge.textContent = inhaler.colors.map(c => c.name).join(", ");
        detailInfoSection.appendChild(colorBadge);
    }

    // Basic info section
    const basicSection = document.createElement("div");
    basicSection.classList.add("detail-info-section");

    if ("inhaler_brand" in inhaler) {
        const infoBrand = document.createElement("div");
        infoBrand.classList.add("detail-info-item");
        infoBrand.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.inhaler")}</span><span class="detail-info-item-value">${inhaler.inhaler_brand.name}</span>`;
        basicSection.appendChild(infoBrand);
    }

    const infoIntakeStyles = document.createElement("div");
    infoIntakeStyles.classList.add("detail-info-item");
    infoIntakeStyles.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.form")}</span><span class="detail-info-item-value">${inhaler.intake_styles.map(s => s.name).join(', ')}</span>`;
    basicSection.appendChild(infoIntakeStyles);

    detailInfoSection.appendChild(basicSection);

    // Age and dosage section
    const ageSection = document.createElement("div");
    ageSection.classList.add("detail-info-section");
    ageSection.innerHTML = `<h3>${getTranslation("detail.age-dosage")}</h3>`;

    const infoOfficialAge = document.createElement("div");
    infoOfficialAge.classList.add("detail-info-item");
    infoOfficialAge.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.official-age")}</span><span class="detail-info-item-value">${inhaler.official_min_age}${getTranslation("detail.years")}</span>`;
    ageSection.appendChild(infoOfficialAge);

    const infoRecommendedAge = document.createElement("div");
    infoRecommendedAge.classList.add("detail-info-item");
    infoRecommendedAge.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.recommended-age")}</span><span class="detail-info-item-value">${inhaler.recommended_min_age}${getTranslation("detail.years")}</span>`;
    ageSection.appendChild(infoRecommendedAge);

    const infoTimesADay = document.createElement("div");
    infoTimesADay.classList.add("detail-info-item");
    infoTimesADay.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.dosage")}</span><span class="detail-info-item-value">${inhaler.times_a_day}${getTranslation("detail.times-day")}</span>`;
    ageSection.appendChild(infoTimesADay);

    detailInfoSection.appendChild(ageSection);

    // Requirements section
    const requirementsSection = document.createElement("div");
    requirementsSection.classList.add("detail-info-section");
    requirementsSection.innerHTML = `<h3>${getTranslation("detail.requirements")}</h3>`;

    const intakeSpeedText = inhaler.good_intake_speed === 1 ? getTranslation("detail.speed-high") : getTranslation("detail.speed-low");
    const infoIntakeSpeed = document.createElement("div");
    infoIntakeSpeed.classList.add("detail-info-item");
    infoIntakeSpeed.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.intake-speed")}</span><span class="detail-info-item-value">${intakeSpeedText}</span>`;
    requirementsSection.appendChild(infoIntakeSpeed);

    const coordinationText = inhaler.good_coordination === 1 ? getTranslation("detail.coord-good") : getTranslation("detail.coord-normal");
    const infoCoordination = document.createElement("div");
    infoCoordination.classList.add("detail-info-item");
    infoCoordination.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.coordination")}</span><span class="detail-info-item-value">${coordinationText}</span>`;
    requirementsSection.appendChild(infoCoordination);

    detailInfoSection.appendChild(requirementsSection);

    // Purpose section
    const purposeSection = document.createElement("div");
    purposeSection.classList.add("detail-info-section");
    purposeSection.innerHTML = `<h3>${getTranslation("detail.purpose")}</h3>`;

    const infoTreatment = document.createElement("div");
    infoTreatment.classList.add("detail-info-item");
    infoTreatment.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.treatment")}</span><span class="detail-info-item-value">${inhaler.treatment_medicine ? getTranslation("detail.yes") : getTranslation("detail.no")}</span>`;
    purposeSection.appendChild(infoTreatment);

    const infoSymptomatic = document.createElement("div");
    infoSymptomatic.classList.add("detail-info-item");
    infoSymptomatic.innerHTML = `<span class="detail-info-item-label">${getTranslation("detail.symptomatic")}</span><span class="detail-info-item-value">${inhaler.symptomatic_medicine ? getTranslation("detail.yes") : getTranslation("detail.no")}</span>`;
    purposeSection.appendChild(infoSymptomatic);

    detailInfoSection.appendChild(purposeSection);

    // Active ingredients section
    const ingredientsSection = document.createElement("div");
    ingredientsSection.classList.add("detail-info-section");
    ingredientsSection.innerHTML = `<h3>${getTranslation("detail.ingredients")}</h3>`;

    const infoActiveIngredients = document.createElement("div");
    infoActiveIngredients.classList.add("detail-info-item");
    infoActiveIngredients.innerHTML = `<span class="detail-info-item-value">${inhaler.active_ingredients.map(ing => ing.name).join(', ')}</span>`;
    ingredientsSection.appendChild(infoActiveIngredients);

    detailInfoSection.appendChild(ingredientsSection);

    // Description section
    if (inhaler.description) {
        const descSection = document.createElement("div");
        descSection.classList.add("detail-info-section");
        const descContent = document.createElement("p");
        descContent.classList.add("detail-description");
        descContent.textContent = inhaler.description;
        descSection.appendChild(descContent);
        detailInfoSection.appendChild(descSection);
    }

    // Links section
    const linksSection = document.createElement("div");
    linksSection.classList.add("detail-action-buttons");

    if (inhaler.links.database) {
        const linkDatabase = document.createElement("a");
        linkDatabase.href = inhaler.links.database;
        linkDatabase.textContent = getTranslation("detail.database-link");
        linkDatabase.target = "_blank";
        linkDatabase.classList.add("btn-primary");
        linksSection.appendChild(linkDatabase);
    }

    if (inhaler.links.tutorial) {
        const linkTutorial = document.createElement("a");
        linkTutorial.href = inhaler.links.tutorial;
        linkTutorial.textContent = getTranslation("detail.tutorial-link");
        linkTutorial.target = "_blank";
        linkTutorial.classList.add("btn-primary");
        linksSection.appendChild(linkTutorial);
    }

    detailInfoSection.appendChild(linksSection);

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