import React from 'react';

import ItemDetails, {Record} from "../item-details/item-details";
import {detailsWithData, withSwapiService, withChildFunction, compose} from '../hoc-helpers';

const PersonChildArr = [
    <Record field="gender" label="Gender"/>,
    <Record field="eyeColor" label="Eye Color"/>
];
const PlanetChildArr = [
    <Record field="population" label="Population"/>,
    <Record field="diameter" label="Diameter"/>,
];

const StarshipChildArr = [
    <Record field="model" label="Model"/>,
    <Record field="length" label="Length"/>,
    <Record field="costInCredits" label="Cost"/>
];

const mapPropsPerson = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
}

const mapPropsStarship = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
}

const mapPropsPlanet = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
}

const PersonDetails = compose(
    withSwapiService(mapPropsPerson),
    detailsWithData,
    withChildFunction(PersonChildArr)
)
(ItemDetails);
// withSwapiService(mapPropsPerson)(
// detailsWithData(
//     withChildFunction(PersonChildArr)(ItemDetails)));
const PlanetDetails = compose(
    withSwapiService(mapPropsPlanet),
    detailsWithData,
    withChildFunction(PlanetChildArr)
)
(ItemDetails);

const StarshipDetails = compose(
    withSwapiService(mapPropsStarship),
    detailsWithData,
    withChildFunction(StarshipChildArr)
)
(ItemDetails);

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}