import React from 'react'

const PropTable = () => (
  <table className="table">
    <thead>
      <tr>
        <th className="table__head">Props</th>
        <th className="table__head">Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="table__data">items</td>
        <td className="table__data">Id list of target contents.</td>
      </tr>
      <tr>
        <td className="table__data">currentClassName</td>
        <td className="table__data">Class name that apply to the navigation element paired with the content element in viewport.</td>
      </tr>
      <tr>
        <td className="table__data">scrolledPastClassName</td>
        <td className="table__data">Class name that apply to the navigation elements that have been scrolled past [optional].</td>
      </tr>
      <tr>
        <td className="table__data">componentTag</td>
        <td className="table__data">HTML tag for Scrollspy component if you want to use other than <code>{'<ul/>'}</code> [optional].</td>
      </tr>
      <tr>
        <td className="table__data">style</td>
        <td className="table__data">Style attribute to be passed to the generated <code>{'<ul/>'}</code> element [optional].</td>
      </tr>
      <tr>
        <td className="table__data">offset</td>
        <td className="table__data">Offset value that adjusts to determine the elements are in the viewport [optional].</td>
      </tr>
      <tr>
        <td className="table__data">rootEl</td>
        <td className="table__data">Name of the element of scrollable container that can be used with <code>{'querySelector'}</code> [optional].</td>
      </tr>
      <tr>
        <td className="table__data">onUpdate</td>
        <td className="table__data">Function to be executed when the active item has been updated [optional].</td>
      </tr>
    </tbody>
  </table>
)

export default PropTable