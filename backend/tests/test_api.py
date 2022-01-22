import json


def _test_get_list_of_items(client, url: str, length: int, list_of_keys: list):
    response = client.get(url)
    data = response.get_json()

    assert type(data) == list
    assert len(data) == length

    for item in data:
        assert ','.join(sorted(list(item.keys()))) == ','.join(sorted(list_of_keys))


def _test_post_create_item(client, url: str, test_data: dict, status_code: int) -> dict:
    response = client.post(url, data=json.dumps(test_data),
                           headers={'Content-Type': 'application/json'})
    data = response.get_json()
    assert response.status_code == status_code
    return data


def test_get_list_of_sauces(client):
    _test_get_list_of_items(client, '/api/sauce', 3, ['id', 'name', 'price'])


def test_get_list_of_ingredients(client):
    _test_get_list_of_items(client, '/api/ingredient', 9, ['id', 'name', 'price'])


def test_get_list_of_pizzas(client):
    _test_get_list_of_items(client, '/api/pizza', 9, ['id', 'name', 'price', 'ingredients'])


def test_create_full_valid_order_of_pizza(client):
    data = _test_post_create_item(client, '/api/order', {
        "pizza": [{"id": "921578dc-08f4-4060-9915-fbc97552ffe2",
                   "ingredients": ["65f40ae8-4ac5-426d-ab98-9d8b1ea21edf",
                                   "2bc0c2fd-ddf8-4f41-b189-fed8bb616369",
                                   "b14f3541-1781-4871-b5b6-d3eb77d1ed28"]}],
        "sauce": [{"id": "307b968e-9c38-40f2-8fdb-80c5a6fe6bd7", "count": 43}],
        "total": 89.30
    }, 201)

    assert data['message'] == 'Order accepted!'


def test_create_valid_order_of_pizza_without_sauce(client):
    data = _test_post_create_item(client, '/api/order', {
        "pizza": [{"id": "921578dc-08f4-4060-9915-fbc97552ffe2",
                   "ingredients": ["65f40ae8-4ac5-426d-ab98-9d8b1ea21edf",
                                   "2bc0c2fd-ddf8-4f41-b189-fed8bb616369",
                                   "b14f3541-1781-4871-b5b6-d3eb77d1ed28"]}],
        "total": 89.30
    }, 201)

    assert data['message'] == 'Order accepted!'


def test_create_valid_order_of_pizza_without_ingredient_of_pizza(client):
    data = _test_post_create_item(client, '/api/order', {
        "pizza": [{"id": "921578dc-08f4-4060-9915-fbc97552ffe2"}],
        "total": 89.30
    }, 201)

    assert data['message'] == 'Order accepted!'


def test_create_invalid_order_of_pizza_without_total_price(client):
    data = _test_post_create_item(client, '/api/order', {
        "pizza": [{"id": "123", "ingredients": ["1", "2", "3"]}],
    }, 422)

    assert ''.join(data['total']) == 'Missing data for required field.'


def test_create_invalid_order_of_pizza_with_empty_list_of_pizzas(client):
    data = _test_post_create_item(client, '/api/order', {
        "pizza": [],
        "total": "89.30"
    }, 422)

    assert ''.join(data['pizza']) == 'Shorter than minimum length 1.'


def test_create_invalid_order_of_pizza_without_pizza_key(client):
    data = _test_post_create_item(client, '/api/order', {
        "total": "89.30"
    }, 422)

    assert ''.join(data['pizza']) == 'Missing data for required field.'
