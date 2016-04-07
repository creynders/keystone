'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'elemental';
import xhr from 'xhr';
import { plural } from '../utils';
import Footer from '../components/Footer';
import MobileNavigation from '../components/Navigation/MobileNavigation';
import PrimaryNavigation from '../components/Navigation/PrimaryNavigation';

import { Link } from 'react-router';

var listsByKey = Keystone.lists;

var ListTile = React.createClass({
	propTypes: {
		count: React.PropTypes.string,
		href: React.PropTypes.string,
		label: React.PropTypes.string,
		path: React.PropTypes.string,
	},
	render () {
		var opts = {
			'data-list-path': this.props.path,
		};
		return (
			<div className="dashboard-group__list" {...opts}>
				<span className="dashboard-group__list-inner">
					<Link to={this.props.href} className="dashboard-group__list-tile">
						<div className="dashboard-group__list-label">{this.props.label}</div>
						<div className="dashboard-group__list-count">{this.props.count}</div>
					</Link>
					<Link to={this.props.href + '?create'} className="dashboard-group__list-create octicon octicon-plus" title="Create" tabIndex="-1" />
				</span>
			</div>
		);
	},
});

var HomeView = React.createClass({
	displayName: 'HomeView',
	getInitialState () {
		return {
			counts: {},
		};
	},
	componentDidMount () {
		this.loadCounts();
	},
	loadCounts () {
		xhr({
			url: `${Keystone.adminPath}/api/counts`,
		}, (err, resp, body) => {
			try {
				body = JSON.parse(body);
			} catch (e) {
				console.log('Error parsing results json:', e, body);
				return;
			}
			if (body && body.counts) {
				if (!this.isMounted()) return;
				this.setState({
					counts: body.counts,
				});
			}
		});
	},
	getHeadingIconClasses (navSectionKey) {
		const icons = [
			{ icon: 'book', sections: ['books', 'posts', 'blog', 'blog-posts', 'stories', 'news-stories', 'content'] },
			{ icon: 'briefcase', sections: ['businesses', 'companies', 'listings', 'organizations', 'partners'] },
			{ icon: 'calendar', sections: ['events', 'dates'] },
			{ icon: 'clock', sections: ['classes', 'hours', 'times'] },
			{ icon: 'file-media', sections: ['gallery', 'galleries', 'images', 'photos', 'pictures'] },
			{ icon: 'file-text', sections: ['attachments', 'docs', 'documents', 'files'] },
			{ icon: 'location', sections: ['locations', 'markers', 'places'] },
			{ icon: 'mail', sections: ['emails', 'enquiries'] },
			{ icon: 'megaphone', sections: ['broadcasts', 'jobs', 'talks'] },
			{ icon: 'organization', sections: ['contacts', 'customers', 'groups', 'members', 'people', 'speakers', 'teams', 'users'] },
			{ icon: 'package', sections: ['boxes', 'items', 'packages', 'parcels'] },
			{ icon: 'tag', sections: ['tags'] },
		];
		const classes = icons
			.filter(obj => obj.sections.indexOf(navSectionKey) !== -1)
			.map(obj => `octicon-${obj.icon}`);

		if (!classes.length) {
			classes.push('octicon-primitive-dot');
		}

		return ['dashboard-group__heading-icon', 'octicon', ...classes].join(' ');
	},
	renderFlatNav () {
		const lists = Keystone.lists.map((list) => {
			var href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
			return <ListTile key={list.path} path={list.path} label={list.label} href={href} count={plural(this.state.counts[list.key], '* Item', '* Items')} />;
		});
		return <div className="dashboard-group__lists">{lists}</div>;
	},
	renderGroupedNav () {
		return (
			<div>
				{Keystone.nav.sections.map((navSection) => {
					return (
						<div className="dashboard-group" key={navSection.key}>
							<div className="dashboard-group__heading" data-section-label={navSection.label}>
								<span className={this.getHeadingIconClasses(navSection.key)} />
								{navSection.label}
							</div>
							<div className="dashboard-group__lists">
								{navSection.lists.map((list) => {
									var href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
									return <ListTile key={list.path} path={list.path} label={list.label} href={href} count={plural(this.state.counts[list.key], '* Item', '* Items')} />;
								})}
							</div>
						</div>
					);
				})}
				{this.renderOrphanedLists()}
			</div>
		);
	},
	renderOrphanedLists () {
		if (!Keystone.orphanedLists.length) return;
		let sectionLabel = 'Other';
		return (
			<div className="dashboard-group">
				<div className="dashboard-group__heading" data-section-label={sectionLabel}>
					<span className="dashboard-group__heading-icon octicon octicon-database" />
					{sectionLabel}
				</div>
				<div className="dashboard-group__lists">
					{Keystone.orphanedLists.map((list) => {
						var href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
						return <ListTile key={list.path} path={list.path} label={list.label} href={href} count={plural(this.state.counts[list.key], '* Item', '* Items')} />;
					})}
				</div>
			</div>
		);
	},
	render () {
		return (
			<Container>
				<div className="dashboard-header">
					<div className="dashboard-heading">{Keystone.brand}</div>
				</div>
				<div className="dashboard-groups">
					{Keystone.nav.flat ? this.renderFlatNav() : this.renderGroupedNav()}
				</div>
			</Container>
		);
	},
});

module.exports = HomeView;
