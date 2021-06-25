import React, { Component } from "react";

class Gallery extends Component {
  state = {};
  render() {
    return (
      <div className="gallery">
        <figure className="gallery__item gallery__item--1">
          <img
            src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
        <figure className="gallery__item gallery__item--2">
          <img
            src="https://images.pexels.com/photos/2689421/pexels-photo-2689421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img
            src="https://images.pexels.com/photos/1860199/pexels-photo-1860199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img
            src="https://images.pexels.com/photos/2067473/pexels-photo-2067473.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
        <figure className="gallery__item gallery__item--5">
          <img
            src="https://images.pexels.com/photos/2059151/pexels-photo-2059151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
        <figure className="gallery__item gallery__item--6">
          <img
            src="https://images.pexels.com/photos/4083585/pexels-photo-4083585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="gallery__img"
            alt=""
          ></img>
        </figure>
      </div>
    );
  }
}

export default Gallery;
