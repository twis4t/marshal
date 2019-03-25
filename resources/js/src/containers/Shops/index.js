import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './styles'
import rowData from './data'

import ModuleTitle from '@/components/ModuleTitle'
import ActionButton from '@/components/ActionButton'
import UsersList from '@/components/Shops/UsersList'
import CompanyForm from '@/components/Shops/CompanyForm'

import { withStyles } from '@material-ui/core/styles'
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
    companyFormDialog: false,
    companyFormMode: true, // false - edit, true - new element
    сompanyForm: {},
    currentRow: {},
  }

  ActionsList = data => [
    {
      title: 'Сотрудники',
      action: () => {
        this.setState({ currentRow: data })
        this.userDialogOpen()
      },
    },
    {
      title: 'Редактировать',
      action: () => {
        this.companyFormOpen()
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

  companyFormOpen = () => {
    this.setState({ companyFormDialog: true })
  }

  companyFormClose = () => {
    this.setState({ companyFormDialog: false })
  }

  companyFormSubmit = data => {
    this.setState({
      сompanyForm: data,
    })
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
              { name: 'actions', title: 'Действия' },
            ]}
          >
            <ImageTypeProvider for={['logo']} />
            <ActionTypeProvider for={['actions']} actions={this.ActionsList} />
            <SearchState defaultValue="" searchPlaceholder="Поиск" />
            <IntegratedFiltering />
            <Table
              columnExtensions={[
                { columnName: 'logo', width: 130 },
                { columnName: 'actions', width: 100, align: 'center' },
              ]}
              messages={{ noData: 'Нет данных' }}
            />
            <Toolbar />
            <SearchPanel defaultValue="" messages={{ searchPlaceholder: 'Поиск' }} />
            <TableHeaderRow />
          </DxGrid>
        </Paper>
        <UsersList
          status={this.state.userDialog}
          onOpen={this.userDialogOpen}
          onClose={this.userDialogClose}
          data={this.state.currentRow}
        />
        <CompanyForm
          isNew={this.state.companyFormMode}
          status={this.state.companyFormDialog}
          onOpen={this.companyFormOpen}
          onClose={this.companyFormClose}
          onSubmit={this.companyFormSubmit}
          data={this.state.сompanyForm}
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
