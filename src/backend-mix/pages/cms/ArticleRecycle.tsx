import * as React from "react";
import withStyles, { WithStyles } from "material-ui/styles/withStyles";
import ReactPaginate from "react-paginate";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import ClearIcon from "material-ui-icons/Clear";
import ReplyAll from "material-ui-icons/ReplyAll";
import Cached from "material-ui-icons/Cached";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "material-ui/Table";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from "material-ui/Dialog";

const styles = {
    evenRow: {
        "background": "#f7f7f7",
    },
    menuBtn: {
        "width": "32px",
        "height": "32px",
        "border-radius": "50%",
        "background-color": "#3f51b5",
        "color": "#fff",
        "margin-left": "10px",
    },
    btnEdit: {
        "width": "32px",
        "height": "32px",
        "border-radius": "50%",
        "background-color": "#3f51b5",
        "color": "#fff",
        "margin-left": "10px",
        "box-shadow": "0px 2px 4px 0 rgba(0, 0, 0, 0.3)",
    },
    btnDelete: {
        "width": "32px",
        "height": "32px",
        "border-radius": "50%",
        "background-color": "#fff",
        "color": "#808080",
        "margin-left": "10px",
        "box-shadow": "0px 2px 4px 0 rgba(0, 0, 0, 0.3)",
    },
    root: {
        "padding": "40px 30px",
    },
    table: {
        "border-top": "1px solid rgba(235, 235, 235, 1)",
        "border-collapse": "inherit",
    },
    tableCell: {
        "text-align": "left",
        "padding": "0",
    },
    tableCellStatus: {
        "text-align": "left",
        "padding-left": "0",
        "padding-right": "0",
        "width": "40px",
    },
};
type State = {
    checkedAll: boolean,
    rowsPerPage: number,
    currentPage: number,
    open: boolean,
    modalId: string,
    modalName: string,
};

class ArticleRecycle extends React.Component<WithStyles<keyof typeof styles>, State> {
    state = {
        checkedAll: false,
        rowsPerPage: 2,
        currentPage: 0,
        open: false,
        modalId: "",
        modalName: "",
        list: [
            {
                id: 1,
                check: false,
                name: "标题名称测试标题名称测试标题名称测试标题名称测试",
                author: "新闻资讯1",
            },
            {
                id: 2,
                check: false,
                name: "标题名称测试标题名称测试标题名称测试标题名称测试",
                author: "新闻资讯2",
            },
            {
                id: 3,
                check: false,
                name: "标题名称测试标题名称测试标题名称测试标题名称测试",
                author: "新闻资讯3",
            },
            {
                id: 4,
                check: false,
                name: "标题名称测试标题名称测试标题名称测试标题名称测试",
                author: "新闻资讯4",
            },
            {
                id: 5,
                check: false,
                name: "标题名称测试标题名称测试标题名称测试标题名称测试",
                author: "新闻资讯5",
            },
        ],
    };
    handleChangeAll = (name: any) => (event: any) => {
        if (event.target.checked) {
            this.state.list.map(item => {
                item.check = true;
            });
        } else {
            this.state.list.map(item => {
                item.check = false;
            });
        }
        this.setState({
            [name]: event.target.checked,
        });
    };
    handleClickEdit = (pro: any) => {
        window.console.log(pro);
    }
    handleChange = (pro: any) => (event: any) => {
        this.state.checkedAll = true;
        pro.check = true;
        if (!event.target.checked) {
            pro.check = false;
        }
        this.state.list.map(item => {
            if (item.check === false) {
                this.state.checkedAll = false;
            }
        });
        this.setState({
            [pro]: event.target.checked,
        });
    };
    handleClickRemove = (pro: any) => {
        this.state.modalName = pro.name;
        this.state.modalId = pro.id;
        this.setState({
            open: true,
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleSubmit = () => {
        this.setState({ open: false });
    };
    handlePageClick = (data: any) => {
        this.setState({ currentPage: data.selected });
    };

    render() {
        const { currentPage, rowsPerPage, list } = this.state;
        return (
            <div className="top-action-module cms">
                <p className="crumbs">
                    CMS / 文章管理
                </p>
                <h4 className="title">回收站</h4>
                <div className="btn-group">
                    <IconButton
                        className={this.props.classes.menuBtn}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        className={this.props.classes.menuBtn}
                    >
                        <Cached />
                    </IconButton>
                </div>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead className="table-head">
                            <TableRow>
                                <TableCell className={this.props.classes.tableCellStatus}>
                                    <Checkbox
                                        checked={this.state.checkedAll}
                                        onChange={this.handleChangeAll("checkedAll")}
                                        value="checkedAll"
                                    />
                                </TableCell>
                                <TableCell className={this.props.classes.tableCell} numeric>文章名称</TableCell>
                                <TableCell className={this.props.classes.tableCell} numeric>作者</TableCell>
                                <TableCell numeric/>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {list.slice(currentPage * rowsPerPage, rowsPerPage * currentPage + rowsPerPage)
                                .map((n, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            className={index % 2 === 0 ? this.props.classes.evenRow : ""}
                                            key={n.id}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                className={this.props.classes.tableCellStatus}
                                            >
                                                <Checkbox
                                                    checked={n.check}
                                                    onChange={this.handleChange(n)}
                                                    value="n.check"
                                                />
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.name}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.author}
                                            </TableCell>
                                            <TableCell numeric>
                                                <IconButton
                                                    className={this.props.classes.btnEdit}
                                                    onClick={() => this.handleClickEdit(n)}
                                                >
                                                    <ReplyAll />
                                                </IconButton>
                                                <IconButton
                                                    className={this.props.classes.btnDelete}
                                                    onClick={() => this.handleClickRemove(n)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <div className="table-pagination">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<a href="javascript:;">...</a>}
                            breakClassName={"break-me"}
                            pageCount={list.length / rowsPerPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </Paper>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-content"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        className="dialog-title"
                    >
                        <IconButton
                            onClick={this.handleClose}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <h4>确定要删除文章名称"{this.state.modalName}"吗?</h4>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} autoFocus>
                            确认提交
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(ArticleRecycle);
