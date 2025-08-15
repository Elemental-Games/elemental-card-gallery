import {
	extend,
	BlockStack,
	InlineStack,
	Text,
	Button,
} from '@shopify/ui-extensions/checkout';

extend('purchase.thank-you.block.render', (root, api) => {
	renderContent(root, api);
});

extend('purchase.order-status.block.render', (root, api) => {
	renderContent(root, api);
});

function renderContent(root, api) {
	const { checkout, navigation } = api;
	const orderId = checkout?.order?.id ?? checkout?.orderId ?? checkout?.id ?? '';
	const redirectUrl = `https://www.elementalgames.gg/post-purchase?order_id=${encodeURIComponent(orderId)}`;

	setTimeout(() => {
		try { navigation?.navigate(redirectUrl); } catch (e) { /* no-op */ }
		try { window.location.href = redirectUrl; } catch (e) { /* no-op */ }
	}, 250);

	const ui = root.createComponent(BlockStack, { spacing: 'loose' }, [
		root.createComponent(Text, { size: 'medium', emphasis: 'strong' }, 'Spin to Win'),
		root.createComponent(Text, {}, 'If eligible, you will be redirected to your wheel spin.'),
		root.createComponent(InlineStack, { spacing: 'base' }, [
			root.createComponent(Button, {
				appearance: 'primary',
				onPress: () => {
					try { navigation?.navigate(redirectUrl); } catch (e) { /* no-op */ }
					try { window.location.href = redirectUrl; } catch (e) { /* no-op */ }
				},
			}, 'Spin Now')
		])
	]);

	root.append(ui);
} 