/** @jsx vNode */

/**
This is our list of components to be used in the app.
**/

export { HomeFullNode, OrderItems, OrderItem, SmallOrderList, LargeOrderList };


import { vNode, objectCombiner } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { switchOrder } from './events.js';


const HomeFullNode = function(props) {
    return(
        <div>
            <OrderDetailsSection orders={props.orders} order={props.order} orderItems={props.orderItems} /> 
            <div id="bottomListOrders">
                <LargeOrderList orders={props.orders} />
            </div>
        </div>
    )
};


const OrderDetailsSection = function(props) {
    return(
        <div>
            <div id="topscreen" style="width: 100%;">
                <SmallOrderList orders={props.orders} /> 
                <OrderItems orders={props.orders} order={props.order} orderItems={props.orderItems} />
            </div>
        </div>
    )
};


const SmallOrderList = function(props) {
    let orders = props.orders;

    let list = [];
    for (let i = 0; i < orders.length; i++) {
        list.push(<OrderListOrder order={orders[i]} />);
    }

    return (
        <div class="orderList">
            {list}
        </div>
    )
};


const OrderListOrder = function(props) {
    
    let fn = function(e) {
        e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
        e.frameworkDetail = e.currentTarget.dataset;
        e.action = e.currentTarget.dataset.action;
        console.log(e.orderId);
    };

    let classString = props.order.Status == 'Draft' ? 'yellow-highlight' : 'green-highlight';
    classString = classString + " orderbox-highlights"
    
    return (
        <div class="orderClick orderItem" data-action="loadorder" onclick={fn} href={"#" + props.order.Id} data-record-id={props.order.Id} >
            <div class={classString}>
                <div class="listOrderId">{props.order.OrderNumber}</div>
                <div class="listOrderDate">{props.order.EffectiveDate}</div>
            </div>
            <div>
                <p class="listOrderText">{props.order.BillToContact ? props.order.BillToContact.Name : "NA"}</p>
            </div>
            <div>
                <p class="listOrderText">{props.order.TotalPrice}</p>
            </div>
        </div>
    )
};


const OrderItems = function(props) {
    let order = props.order;
    let theList = <OrderItemList order={props.order} orderItems={props.orderItems} />;
    
    if (order) {
        order = props.order[0];
        
        let contactName = "NA";
        if (order.BillToContact) {
            contactName = order.BillToContact.Name;
        }
        
        let fn = function(e) {
            let currentTargetDataset = e.currentTarget.dataset || {};
            let targetDataset = e.target.dataset || {};
    
            e.frameworkDetail = objectCombiner(currentTargetDataset, targetDataset);
            if (e.type == "click") {
                e.frameworkDetail.action = "add-order-item";
            }
        };
        
        return(
            <div>
                <div>
                    <div>
                        <h1 style="float:left;">{"Order " + order.OrderNumber + ":"}</h1>
                    </div>
                    <div class="yellow-highlight" style="float:right;">
                        {"Created " + order.EffectiveDate + ", by NEED THIS DATA"}
                    </div>
                    <h1>{" " + contactName}</h1>
                    <h4>{order.TotalAmount}</h4>
                    <div>
                        <button class="add-order-button" type="button" onclick={fn} data-action="add-order-item" data-record-id={order.Id} >
                            Add Order Item
                        </button>
                    </div>
                    {theList}
                </div>
            </div>
        )
    }
    else {
        console.log("right side not rendered");
        return(
            <div>Right side not rendered</div>
        )
    }
};


const OrderItemList = function(props) {
    let order = props.order;
    let orderItemsProps = props.orderItems || [];

    let orderItemsVnodes = [];
    for (let i = 0; i < orderItemsProps.length; i++) {
        orderItemsVnodes.push(<OrderItem order={order} orderItem={orderItemsProps[i]} />);
    }

    return (
        <div style="width:70%; float:left;" id="listOfOrderItems">
            {orderItemsVnodes}
        </div>
    )
};

const OrderItem = function(props) {

    let orderItem = props.orderItem;
    let order = props.order;

    let tableContact = "NA";
    let tableContactId = "0030a00001V0uTWAAZ";
    let tableExpiry = "NA";
    let tableProduct = "NA";
    let tableProductId = "01t0a000004Ov6bAAC";
    let tableDiscription = "NA";
    let tableNote1 = "NA";
    let tableNote2 = "NA";
    let tableNote3 = "NA";
    let tableUnitPrice = "NA";
    let tableQuantity = "NA";
    let tableSubtotal = "NA";

    if (orderItem.Product2) {
        if (orderItem.Product2.Name) {
            tableProduct = orderItem.Product2.Name;
        }
    }
    if (orderItem.UnitPrice) {
        tableUnitPrice = orderItem.UnitPrice;
    }
    if (orderItem.Quantity) {
        tableQuantity = orderItem.Quantity;
    }
    if (orderItem.TotalPrice) {
        tableSubtotal = orderItem.TotalPrice;
    }
    if (orderItem.Note_1__c) {
        tableNote1 = orderItem.Note_1__c;
    }
    if (orderItem.Note_2__c) {
        tableNote2 = orderItem.Note_2__c;
    }
    if (orderItem.Note_3__c) {
        tableNote3 = orderItem.Note_3__c;
    }
    if (orderItem.FirstName__c) {
        if (orderItem.LastName__c) {
            tableContact = orderItem.FirstName__c + " " + orderItem.LastName__c;
        }
        else {
            tableContact = orderItem.FirstName__c;
        }
    }
    else {
        if (orderItem.LastName__c) {
            tableContact = orderItem.LastName__c;
        }
    }
    if (orderItem.ExpirationDate__c) {
        tableExpiry = orderItem.ExpirationDate__c;
    }

    let fn = function(e) {
        let currentTargetDataset = e.currentTarget.dataset || {};
        let targetDataset = e.target.dataset || {};

        e.frameworkDetail = objectCombiner(currentTargetDataset, targetDataset);
        if (e.type == "change") {
            e.frameworkDetail.action = "save-order-item";
        }
        else if (e.type == "click") {
            e.frameworkDetail.action = "toggle-notes";
        }
    };
    
    return (
        <div class="orderItemBox">
            <div class={"autocomplete id-" + orderItem.Id} id={"id-" + orderItem.Id} onchange={fn} onclick={fn} data-orderitem-id={order[0].Id} data-record-id={orderItem.Id} data-action="save-order-item">
                <div class="order-actions order-item" style="float:left;">
                    <a target="_blank" class="marginMaker2">Remove Order Item</a>
                </div>
                <div class="order-note-buttons order-item" style="float:left;">
                    <button class="note-button-1 styled-active" type="button" data-which-notes={1}  data-action="toggle-notes">
                        Toggle Note 1
                    </button>
                </div>
                <div class="order-note-buttons order-item" style="float:left;">
                    <button class="note-button-2 styled-active" type="button" data-which-notes={2}  data-action="toggle-notes">
                        Toggle Note 2
                    </button>
                </div>
                <div class="order-note-buttons order-item">
                    <button class="note-button-3 styled-active" type="button" data-which-notes={3}  data-action="toggle-notes">
                        Toggle Note 3
                    </button>
                </div>
                
                <div class="not-notes hidden displayed">
                    <div class="order-actions order-item order-item-contact" style="float:left;">
                        <p>Contact</p>
                        <input class="orderOnChange orderItemData contact" type="text" autocomplete="off" id="contact" value={tableContact} required maxlength="100" />
                        <input class="orderOnChange orderItemData contactId" type="hidden" id="contactId" value={tableContactId} />
                    </div>
                    <div class="order-actions order-item order-item-experation" style="float:left;">
                        <p>Experation</p>
                        <input class="orderOnChange orderItemData expiration" style="width: 75px;" type="text" id="experation" value={tableExpiry} maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-product" style="float:left;">
                        <p>Product</p>
                        <input class="orderOnChange orderItemData product" type="text" autocomplete="off" id="product" value={tableProduct} required maxlength="100" />
                        <input class="orderOnChange orderItemData productId" type="hidden" id="productId" value={tableProductId} />
                    </div>
                    <div class="order-actions order-item order-item-description" style="float:left;">
                        <p>Line Descritpion</p>
                        <input class="orderOnChange orderItemData description" type="text" id="discription" value={tableDiscription} maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-price" style="float:left;">
                        <p>Unit Price</p>
                        <input class="orderOnChange orderItemData unitprice" style="width: 75px;" type="text" id="unitprice" value={tableUnitPrice} required maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-quantity" style="float:left;">
                        <p>Quantity</p>
                        <input class="orderOnChange orderItemData quantity" style="width: 75px;" type="number" id="quantity" value={tableQuantity} required maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-total">
                        <p>Sub Total</p>
                        <input class="orderOnChange orderItemData subtotal" style="width: 75px;" type="number" id="subtotal" value={tableSubtotal} required maxlength="100" />
                    </div>
                </div>
                <div class="order-actions order-item order-item-note-1 hidden">
                    <p>Note 1</p>
                    <textarea class="orderOnChange orderItemData note1" id="note1" name="note1" rows="4" cols="100">{tableNote1}</textarea>
                </div>
                <div class="order-actions order-item order-item-note-2 hidden">
                    <p>Note 2</p>
                    <textarea class="orderOnChange orderItemData note2" id="note2" name="note2" rows="4" cols="100">{tableNote2}</textarea>
                </div>
                <div class="order-actions order-item order-item-note-3 hidden">
                    <p>Note 3</p>
                    <textarea class="orderOnChange orderItemData note3" id="note3" name="note3" rows="4" cols="100">{tableNote3}</textarea>
                </div>
            </div>
        </div>
    )
};


const LargeOrderList = function(props) {
    let orders = props.orders;

    let list = [];
    for (let i = 0; i < orders.length; i++) {
        list.push(<OrderListOrder order={orders[i]} />);
    }

    return(
        <div id="bottomscreen" style="clear:both">
            <div class="orderList">
                {list}
            </div>
        </div>
    )
};
