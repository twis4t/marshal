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

const ImageTypeProvider = props => <DataTypeProvider formatterComponent={ShopImage} {...props} />
const ShopImage = ({ value }) => <img src={value} width={80} />

const ActionTypeProvider = props => (
  <DataTypeProvider formatterComponent={data => ActionButtonFormatter({ ...data, ...props })} {...props} />
)

const ActionButtonFormatter = meta => <ActionButton actions={meta.actions(meta.row)} />

ShopImage.propTypes = {
  value: PropTypes.string.isRequired,
}

ActionTypeProvider.propTypes = {
  actions: PropTypes.func.isRequired,
}

class Shops extends Component {
  state = {
    rowData: rowData,
    userDialog: false,
    currentCompany: {},
  }

  ActionsList = data => [
    {
      title: 'Сотрудники',
      action: () => {
        this.setState({ currentCompany: data })
        this.userDialogOpen()
      },
    },
    {
      title: 'Редактировать',
      action: () => {
        console.log('edit company ' + data.name)
      },
    },
    {
      title: 'Удалить',
      action: () => {
        console.log('remove company')
      },
    },
  ]

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
            <ActionTypeProvider for={['id']} actions={this.ActionsList} />
            <SearchState defaultValue="" />
            <IntegratedFiltering />
            <Table
              columnExtensions={[{ columnName: 'logo', width: 130 }, { columnName: 'id', width: 100, align: 'center' }]}
            />
            <Toolbar />
            <SearchPanel defaultValue="" />
            <TableHeaderRow />
          </DxGrid>
        </Paper>
        <UsersList
          status={this.state.userDialog}
          onOpen={this.userDialogOpen}
          onClose={this.userDialogClose}
          data={this.state.currentCompany}
        />
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
