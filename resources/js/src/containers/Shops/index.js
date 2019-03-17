import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import ModuleTitle from '@/components/ModuleTitle'

import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/ag-theme-material.css'

class Shops extends Component {
  state = {
    columnDefs: [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' },
    ],
    rowData: [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
    ],
  }
  render() {
    return (
      <div>
        <ModuleTitle title="Управление магазинами" />
        <div
          className="ag-theme-material"
          style={{
            height: '500px',
            width: '600px',
          }}
        >
          <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

Shops.propTypes = {
  //
}

export default connect(mapStateToProps)(Shops)
