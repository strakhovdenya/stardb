import React from 'react';
import ItemList from '../item-list';
import {withData, withSwapiService, withChildFunction, compose} from '../hoc-helpers';

const RenderName = ({name}) => <span>{name}</span>;
const RenderModelAndName = ({name, model}) => <span>{name} ({model})</span>;
const mapPersonToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}
const mapPlanatToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}
const mapStarshipToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const PersonList = compose(
    withSwapiService(mapPersonToProps),
    withData,
    withChildFunction(RenderName)
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanatToProps),
    withData,
    withChildFunction(RenderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipToProps),
    withData,
    withChildFunction(RenderModelAndName)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
}