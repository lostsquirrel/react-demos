import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ProductCategoryRow(props) {
    // const cats = ;
    // console.log(props)

    return (
        <div><span className="category">{props.value}</span></div>
    )
}


function productFilter(inStockOnly, filterText) {
    function pFilter(product) {
        let bool = true;
        if (inStockOnly) {
            bool = bool && product.stocked
        }
        if (filterText) {
            bool = bool && product.name.includes(filterText)
        }
        return bool;
    }

    return pFilter

}

function filterProduct(products, filterHandler) {
    return products.filter(filterHandler)
}

function transformProduct(products) {
    let data = {};
    products.forEach(product => {
        if (data[product.category]) {
            data[product.category].push(product)
        } else {
            data[product.category] = [product]
        }
    });
    // console.log(data)
    return data

}

class ProductRow extends React.Component {
    render() {
        return (
            <div>
                <span
                    className={this.props.value.stocked ? 'product_name' : 'product_name stockOut'}>
                    {this.props.value.name}
                </span>
                <span className="product_price">{this.props.value.price}</span>

            </div>
        )
    }
}

class ProductTable extends React.Component {


    render() {
        const products = this.props.value;
        // console.log(typeof this.props.value)
        // console.log(this.props.value)
        // console.log(this.props.value.keys)
        const categorys = Object.keys(this.props.value);

        const list = [];
        categorys.forEach((category) => {
                const ps = products[category];
                list.push(<ProductCategoryRow key={category} value={category}/>);
                list.push(ProductTable.categoryProductList(ps))

            }
        )
        ;

        return (
            <div>

                {list}
            </div>
        )
    }

    static categoryProductList(products) {
        return products.map((product) =>
            <ProductRow key={product.name} value={product}/>
        )

    }
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.props.handleInputChange(event)
    }

    render() {
        return (
            <div>
                <input name="filterText" type="text" onChange={this.props.handleInputChange}/> <br/>
                <label>
                    <input name="inStockOnly"
                           type="checkbox"
                           onChange={this.props.handleInputChange}
                    />
                    Only show products in stock
                </label>
            </div>

        )
    }
}

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {filterText: '', inStockOnly: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        // console.log(this.props.products)
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // console.log(name)

        this.setState({
            [name]: value
        });
    }

    render() {
        const xfilter = productFilter(this.state.inStockOnly, this.state.filterText);
        const filteredProductList = transformProduct(filterProduct(this.props.products, xfilter));
        return (
            <div>
                <SearchBar
                    inStockOnly={this.state.inStockOnly}
                    filterText={this.state.filterText}

                    handleInputChange={this.handleInputChange}
                />
                <div><span>Name</span><span>Price</span></div>
                <ProductTable value={filteredProductList}/>
            </div>
        )
    }

}

const dataList = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


ReactDOM.render(<FilterableProductTable products={dataList}/>, document.getElementById('root'));

