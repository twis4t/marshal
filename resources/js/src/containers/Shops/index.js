import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* actions */
import { getShops, editShop, addShop, archiveShop, deleteShop, setCategories, getShopStaff } from '@/actions/ShopActions'
import { getCategories, addCategory, editCategory, removeCategory } from '@/actions/CategoryActions'
import { editUser } from '@/actions/AccountActions'

import classNames from 'classnames'
import styles from './styles'
import moment from 'moment'

import ModuleTitle from '@/components/ModuleTitle'
import ActionButton from '@/components/ActionButton'
import UsersList from '@/components/Shops/UsersList'
import CompanyForm from '@/components/Shops/CompanyForm'
import CategoryModal from '@/components/Shops/CategoryModal'

import { withStyles } from '@material-ui/core/styles'
import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  SearchPanel,
  Toolbar,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import {
  DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'
import { Paper, Button, LinearProgress, Switch, FormControlLabel } from '@material-ui/core'
import { AllInbox as AllInboxIcon } from '@material-ui/icons'
import { isNull } from 'util'

// const ImageTypeProvider = props => <DataTypeProvider formatterComponent={ShopImage} {...props} />
// const ShopImage = ({ value }) => <img src={value} width={80} />

// Отображаем список категорий магазина в ячейке
const CategoryTypeProvider = props => <DataTypeProvider formatterComponent={CategoryFormatter} {...props} />
const CategoryFormatter = ({ value }) => value.map(cat => cat.category).join(', ')

/*ShopImage.propTypes = {
  value: PropTypes.string.isRequired,
}*/
CategoryFormatter.propTypes = {
  value: PropTypes.array.isRequired,
}

// Отображаем архив
const BanTypeProvider = props => <DataTypeProvider formatterComponent={BanFormatter} {...props} />
const BanFormatter = ({ value }) =>
  isNull(value) ? (
    ''
  ) : (
    <span title={'В архиве с ' + moment(value).format('DD.MM.YYYY')}>
      <AllInboxIcon color="secondary" />
    </span>
  )
BanFormatter.propTypes = {
  value: PropTypes.string,
}

// Компонент отображения кнопки действий
const ActionTypeProvider = props => (
  <DataTypeProvider formatterComponent={data => ActionButtonFormatter({ ...data, ...props })} {...props} />
)
const ActionButtonFormatter = meta => <ActionButton actions={meta.actions(meta.row)} />
ActionTypeProvider.propTypes = {
  actions: PropTypes.func.isRequired,
}

// Выделение строк при наведении
const CustomTableRowBase = ({ classes, ...restProps }) => <Table.Row className={classes.customRow} {...restProps} />
const CustomTableRow = withStyles(styles, { name: 'CustomTableRow' })(CustomTableRowBase)
CustomTableRowBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

class Shops extends Component {
  state = {
    showArchiveRow: false,
    userDialog: false,
    companyFormDialog: false,
    categoryDialog: false,
    isNewCompany: true,
    сompanyForm: {},
    currentRow: {},
    currentShopStaff: [],
    sorting: [{ columnName: 'name', direction: 'asc' }],
  }

  componentDidMount = () => {
    this.props.getShops()
    this.props.getCategories()
  }

  changeSorting = sorting => this.setState({ sorting })

  /**
   * Функция возвращает список возможных
   * действий со строкой реестра
   */
  ActionsList = data => [
    {
      title: 'Сотрудники',
      action: async () => {
        this.setState({ currentRow: data })
        await this.getShopStaff(data.id)
        this.userDialogOpen()
      },
    },
    {
      title: 'Редактировать',
      action: () => {
        this.setState({ сompanyForm: data, isNewCompany: false })
        this.companyFormOpen()
      },
    },
    {
      title: 'В архив',
      visible: data.archive_date === null,
      action: () => {
        this.archiveShop(data.id)
      },
    },
    {
      title: 'Удалить',
      visible: true,
      action: () => {
        this.deleteShop(data.id)
      },
    },
    {
      title: 'Вернуть из архива',
      visible: data.archive_date !== null,
      action: () => {
        this.archiveShop(data.id, null)
      },
    },
  ]

  // Прячем строки, выведенные в архив
  filteredArchiveShops = () => {
    const showArchiveRow = this.state.showArchiveRow
    const rows = this.props.shopsData.shops
    const result = rows.filter(
      row => isNull(row.archive_date) || moment().diff(row.archive_date, 'minutes') < 0 || showArchiveRow
    )
    return result
  }

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

  categoryDialogOpen = async () => {
    await this.props.getCategories()
    this.setState({ categoryDialog: true })
  }

  categoryDialogClose = () => {
    this.setState({ categoryDialog: false })
  }

  addCompanyDialog = () => {
    this.setState({ сompanyForm: {}, isNewCompany: true })
    this.companyFormOpen()
  }

  addCategory = async data => {
    await this.props.addCategory(data)
  }

  editCategory = async (id, data) => {
    await this.props.editCategory(id, data)
  }

  removeCategory = async id => {
    await this.props.removeCategory(id)
  }

  companyFormSubmit = async (data, categories) => {
    this.setState({
      сompanyForm: data,
    })
    if (this.state.isNewCompany) {
      await this.props.addShop(data)
      if (this.props.shopsData.insertedId > 0 && categories.length > 0)
        await this.props.setCategories(this.props.shopsData.insertedId, categories)
    } else {
      await this.props.editShop(data.id, data)
      await this.props.setCategories(data.id, categories)
    }

    this.props.getShops()
  }

  archiveShop = async (id, date = moment().format('YYYY-MM-DD')) => {
    await this.props.archiveShop(id, date)
    this.props.getShops()
  }

  deleteShop = async (id) => {
    await this.props.deleteShop(id)
    this.props.getShops()
  }

  handleArchiveChange = event => {
    this.setState({ showArchiveRow: event.target.checked })
  }

  getShopStaff = async id => {
    this.setState({ currentShopStaff: [] })
    await this.props.getShopStaff(id)
    this.setState({ currentShopStaff: this.props.currentShopStaff })
  }

  editUser = async (id, data) => {
    await this.props.editUser(id, data)
  }

  render() {
    const { classes, shopsData, categories } = this.props

    return (
      <div className={classes.flexGrow}>
        <ModuleTitle
          title="Управление магазинами"
          breadcrumbs={[{ text: 'Главная', path: '/' }, { text: 'Магазины' }]}
        />
        <div className={classes.actionsBox}>
          <Button variant="outlined" color="primary" onClick={this.addCompanyDialog}>
            Добавить
          </Button>
          <Button variant="outlined" color="primary" onClick={this.categoryDialogOpen}>
            Категории
            {categories.isFetching ? <LinearProgress color="primary" className={classes.buttonProgress} /> : ''}
          </Button>
          <div className={classes.flexGrow} />
          <FormControlLabel
            control={
              <Switch checked={this.state.showArchiveRow} onChange={this.handleArchiveChange} value="showArchive" />
            }
            label="Архив"
          />
        </div>
        <Paper className={classNames(classes.paperCard, classes.flexGrow)}>
          {shopsData.isFetching ? <LinearProgress color="primary" className={classes.progress} /> : ''}
          <DxGrid
            rows={this.filteredArchiveShops()}
            columns={[
              { name: 'name', title: 'Наименование' },
              { name: 'description', title: 'Описание' },
              { name: 'categories', title: 'Категории' },
              { name: 'address', title: 'Адрес' },
              { name: 'phone', title: 'Телефон' },
              { name: 'comment', title: 'Примечание' },
              { name: 'archive_date', title: 'Архив' },
              { name: 'actions', title: 'Действия' },
            ]}
          >
            {/* <ImageTypeProvider for={['logo']} /> */}
            <SortingState
              sorting={this.state.sorting}
              onSortingChange={this.changeSorting}
              columnExtensions={[{ columnName: 'actions', sortingEnabled: false }]}
            />
            <IntegratedSorting />
            <CategoryTypeProvider for={['categories']} />
            <ActionTypeProvider for={['actions']} actions={this.ActionsList} />
            <SearchState defaultValue="" searchPlaceholder="Поиск" />
            <PagingState defaultCurrentPage={0} pageSize={10} />
            <IntegratedPaging />
            <PagingPanel />
            <BanTypeProvider for={['archive_date']} />
            <IntegratedFiltering />
            <Table
              rowComponent={CustomTableRow}
              columnExtensions={[
                { columnName: 'actions', width: 120, align: 'center' },
                { columnName: 'archive_date', width: 100, align: 'left' },
              ]}
              messages={{ noData: 'Нет данных' }}
            />
            <Toolbar />
            <SearchPanel defaultValue="" messages={{ searchPlaceholder: 'Поиск' }} />
            <TableHeaderRow showSortingControls messages={{ sortingHint: 'Сортировка' }} />
          </DxGrid>
        </Paper>
        <UsersList
          status={this.state.userDialog}
          onOpen={this.userDialogOpen}
          onClose={this.userDialogClose}
          data={this.state.currentRow}
          users={this.state.currentShopStaff || []}
          editUser={this.editUser}
          update={this.getShopStaff}
        />
        <CompanyForm
          isNew={this.state.isNewCompany}
          status={this.state.companyFormDialog}
          onOpen={this.companyFormOpen}
          onClose={this.companyFormClose}
          onSubmit={this.companyFormSubmit}
          data={this.state.сompanyForm}
          categories={categories.categories.map(item => ({ id: item.id, category: item.category }))}
        />
        <CategoryModal
          status={this.state.categoryDialog}
          onAdd={this.addCategory}
          onEdit={this.editCategory}
          onRemove={this.removeCategory}
          onOpen={this.categoryDialogOpen}
          onClose={this.categoryDialogClose}
          data={categories.categories}
        />
      </div>
    )
  }
}

Shops.propTypes = {
  classes: PropTypes.object.isRequired,
  shopsData: PropTypes.object.isRequired,
  currentShopStaff: PropTypes.array.isRequired,
  getShops: PropTypes.func.isRequired,
  editShop: PropTypes.func.isRequired,
  deleteShop: PropTypes.func.isRequired,
  addShop: PropTypes.func.isRequired,
  archiveShop: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
  getShopStaff: PropTypes.func.isRequired,

  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,

  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    shopsData: store.shop,
    categories: store.category,
    currentShopStaff: store.shop.currentShopStaff,
  }
}

const mapDispatchToProps = dispatch => ({
  getShops: () => dispatch(getShops()),
  getShopStaff: id => dispatch(getShopStaff(id)),
  editShop: (id, data) => dispatch(editShop(id, data)),
  addShop: data => dispatch(addShop(data)),
  archiveShop: (id, date) => dispatch(archiveShop(id, date)),
  deleteShop: (id) => dispatch(deleteShop(id)),
  setCategories: (id, categories) => dispatch(setCategories(id, categories)),
  getCategories: () => dispatch(getCategories()),
  addCategory: data => dispatch(addCategory(data)),
  editCategory: (id, data) => dispatch(editCategory(id, data)),
  removeCategory: id => dispatch(removeCategory(id)),
  editUser: (id, data) => dispatch(editUser(id, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Shops))
