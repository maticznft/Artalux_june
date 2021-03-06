import React, { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, lighten, makeStyles } from '@material-ui/core/styles';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import FormControl from "@material-ui/core/FormControl";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Input from "@material-ui/core/Input";
import { Button } from '@material-ui/core';
import { getfaqlist, deletfaq, getSubscriberList, updateSubscriberStatus } from '../../actions/users';
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import ReactDatatable from '@ashvin27/react-datatable';
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser';
function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}
toast.configure();
let toasterOption = {
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: 'question', numeric: false, disablePadding: true, label: 'Question' },
	{ id: 'answer', numeric: true, disablePadding: false, label: 'Answer' },
	{ id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={'left'}
						// padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
}));



const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

const customStyle = makeStyles(customInputStyle);

export default function EnhancedTable() {

	const Wallet_Details = useSelector(state => state.wallet_connect_context);

	const customStyles = customStyle();
	const classes = useStyles();
	const classesSearch = useToolbarStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [userdet, setUser] = useState();
	const [typingTimeout, setTypingTimeout] = useState(0)
	const [searchQuery, setSearchQuery] = React.useState("");
	const [responsive, setresponsive] = useState(true);
	const history = useHistory();
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	function editR(id) {
		// alert(e.target.id);
		if (id != '') {
			// window.location="/metitfnobmalnew/faqedit/"+id;
			history.push({
				pathname: "/faqedit/" + id._id,
				state: {
					items: id
				}
			})
		}

	}
	// const viewuser = (e) => {
	//     //console.lo(e.target.id);
	// }
	function deleteR(id) {
		if (id != '') {
			deletfaq(id);
			toast.success('Faq deleted successfully', toasterOption);
			//getFaqList();
			//window.location="/faqlist";
		}
	}


	const getSubList = async () => {
		var subscriberData = await getSubscriberList();
		console.log("subscriberData.Success ",subscriberData.Success)
		if (subscriberData.Success) {
			setUser(subscriberData.data);
		}	
		else
			toast.error("Error on Server")
	}

	const add = async () => {
		window.location = "/xulatra/subscriberadd";
	}

	const handleChange1 = (event) => {
		const { name, value } = event.target;
		const self = this;
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setSearchQuery(value)
		setTypingTimeout(setTimeout(function () {
			getAll({ 'search': value });
		}, 1000))
	}

	const getAll = async (search = {}) => {
		let filterData = search;
		if (filterData.search == '') {
			filterData = {}
		}
		var res = await getfaqlist(filterData);
		//console.lo("getfaqlist",res)
		setUser(res.userValue);
	}
	const handleChangemaysent = async (event) => {
		let {id , checked} = event.target;
		let handlemaychange = await updateSubscriberStatus({email : id , maySentChecked : checked});
		if (handlemaychange.Success) {
			toast.success('Success...Please wait for data refresh',toasterOption);
			setTimeout(()=>{
				window.location.reload();
			},2000)
		}
		else{
			toast.error('Error on Server',toasterOption);
		}
	}
	useEffect(() => {
		//logout(history)
		getSubList();
	}, []);
	const columns = [
		{
			key: "email",
			text: "Email",
			className: "email",
			align: "left",
			sortable: false,
			cell: record =>
				<>{ReactHtmlParser(record.email)}</>
		},
		(Wallet_Details.UserAccountAddr==Wallet_Details.ownget)
		&&
		{
			key: "action",
			text: "Action",
			className: "action",
			width: 200,
			align: "left",
			sortable: false,
			cell: record => {
				return (
					<Fragment>
						{(Wallet_Details.UserAccountAddr==Wallet_Details.ownget) &&record && <input type="checkbox" name={record._id} id={record.email} checked={record.maySent} onChange={(event) =>{ handleChangemaysent(event)}}/>}
					</Fragment>
				);
			}
		}
		
	];
	const configdata = {
		page_size: 10,
		length_menu: [10, 20, 50],
		filename: "Users",
		no_data_text: 'No user found!',

		language: {
			length_menu: "Show _MENU_ result per page",
			filter: "Filter in records...",
			info: "Showing _START_ to _END_ of _TOTAL_ records",
			pagination: {
				first: "First",
				previous: "Previous",
				next: "Next",
				last: "Last"
			}
		},
		show_length_menu: true,
		show_filter: true,
		show_pagination: true,
		show_info: true,
		defaultSortAsc: true,
	};


	function pageChange(pageData) {
		//console.lo("OnPageChange", pageData);
	}
	return (
		<div className={classes.root}>
			<div className="page_header">
				<h2>Subscriber Lists</h2>
				<div>
					{(Wallet_Details.UserAccountAddr==Wallet_Details.ownget) &&
                    <Button className="Button" variant="contained" color="primary" onClick={add}>Send News Letter</Button>
}
                </div>
			</div>
			<Paper className={classes.paper}>
				<ReactDatatable
					responsive={responsive}
					config={configdata}
					records={userdet}
					columns={columns}
					onPageChange={pageChange()}
				/>
			</Paper>
		</div>
	);
}
