import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ModuleTitle from '@/components/ModuleTitle'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from './styles'
import rowData from './data'
import ActionButton from '@/components/ActionButton'
import UsersList from '@/components/Shops/UsersList'
import { Grid as DxGrid, Table, TableHeaderRow, SearchPanel, Toolbar } from '@devexpress/dx-react-grid-material-ui'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Paper } from '@material-ui/core'

const ActionsList = meta => [
  {
    title: 'Сотрудники',
    action: () => {
      console.log(meta.row.name + ' users list')
    },
  },
  {
    title: 'Редактировать',
    action: () => {
      console.log('edit company ' + meta.row.name)
    },
  },
  {
    title: 'Удалить',
    action: () => {
      console.log('remove company')
    },
  },
]

const ImageTypeProvider = props => <DataTypeProvider formatterComponent={ShopImage} {...props} />

const ShopImage = ({ value }) => <img src={value} width={80} />

ShopImage.propTypes = {
  value: PropTypes.string.isRequired,
}
const ActionTypeProvider = props => <DataTypeProvider formatterComponent={ActionButtonFormatter} {...props} />

const ActionButtonFormatter = meta => <ActionButton actions={ActionsList(meta)} {...meta} />

class Shops extends Component {
  state = {
    rowData: rowData,
    userDialog: false,
  }

  userDialogOpen = () => {
    this.setState({ userDialog: true })
  }

  userDialogClose = () => {
    this.setState({ userDialog: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.flexGrow}>
        <ModuleTitle title="Управление магазинами" />

        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          <DxGrid
            rows={this.state.rowData}
            columns={[
              { name: 'logo', title: 'Логотип', width: 100 },
              { name: 'name', title: 'Наименование' },
              { name: 'description', title: 'Описание' },
              { name: 'address', title: 'Адрес' },
              { name: 'phone', title: 'Телефон' },
              { name: 'staff', title: 'Сотрудники' },
              { name: 'id', title: 'Действия' },
            ]}
          >
            <ImageTypeProvider for={['logo']} />
            <ActionTypeProvider for={['id']} />
            <SearchState defaultValue="" />
            <IntegratedFiltering />
            <Table
              columnExtensions={[{ columnName: 'logo', width: 130 }, { columnName: 'id', width: 100, align: 'center' }]}
            />
            <Toolbar />
            <SearchPanel />
            <TableHeaderRow />
          </DxGrid>
        </Paper>
        <UsersList status={this.state.userDialog} onOpen={this.userDialogOpen} onClose={this.userDialogClose} />
      </div>
    )
  }
}

Shops.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

Shops.propTypes = {
  //
}

export default connect(mapStateToProps)(withStyles(styles)(Shops))
