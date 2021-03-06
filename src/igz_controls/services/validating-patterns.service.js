(function () {
    'use strict';

    angular.module('iguazio.dashboard-controls')
        .factory('ValidatingPatternsService', ValidatingPatternsService);

    function ValidatingPatternsService(lodash) {
        return {
            boolean: /^(0|1)$/,
            browseAttributeName: /^[A-Za-z_][A-Za-z0-9_]*$/,
            container: /^(?!.*--)(?!.*__)(?=.*[a-z])[a-z0-9][a-z0-9-_]*[a-z0-9]$|^[a-z]$/,
            digits: /^\+?(0|[1-9]\d*)$|^$/,
            email: /^[^@]+@[^@]+\.[^@]+$/,
            float: /^\d{1,9}(\.\d{1,2})?$/,
            floatingPoint: /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,
            fullName: /^[a-zA-Z][a-zA-Z- ]*$/,
            functionName: /^(?=[\S\s]{1,63}$)[a-z]([-a-z0-9]*[a-z0-9])?$/,
            geohash: /^[a-z0-9]*$/,
            hostName_IpAddress: /(^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$)|(^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$)/,
            id: /^[a-zA-Z0-9\-]*$/,
            ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            k8s: {
                envVarName: /^(?!\.$)(?!\.\.[\S\s]*$)[-._a-zA-Z][-._a-zA-Z0-9]*$/
            },
            mask: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
            name: /^[a-zA-Z0-9_]*$/,
            negativeFloat: /^[-]?\d{1,9}(\.\d{1,2})?$/,
            negativeInteger: /^[-]?(0|[1-9]\d*)$|^$/,
            networkName: /^[a-zA-Z0-9\.\-\()\\\/:\s]*$/,
            noSpacesNoSpecChars: /^[A-Za-z0-9_-]*$/,
            password: /^.{6,128}$/,
            path: /^(\/[\w-]+)+(.[a-zA-Z]+?)$/,
            percent: /^([1-9]|[1-9][0-9]|100)$/,
            phone: /^\+?\d[\d\-]{4,17}$/,
            protocolIpPortAddress: /^[a-z]{2,6}\:\/\/(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))(\:\d{1,5})?$/,
            storage: /^[a-zA-Z0-9]+?\:\/\/[a-zA-Z0-9\_\-\.]+?\:[a-zA-Z0-9\_\-\./]+?\@[a-zA-Z0-9\_\-\.]+?$/,
            tenantName: /^(?=.{1,31}$)[a-zA-Z]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/,
            timestamp: /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?((?:[+-](?:[0-1]\d|2[0-3]):[0-5]\d)|Z)?$/,
            url: /^[a-zA-Z0-9]+?\:\/\/[a-zA-Z0-9\_\-\.]+?\:[a-zA-Z0-9\_\-\.]+?\@[a-zA-Z0-9\_\-\.]+?$/,
            username: /^(?=.{1,32}$)[a-zA-Z][-_a-zA-Z0-9]*$/,
            usernameAndTenantName: /^(?=.{1,32}(@|$))[a-zA-Z][-_a-zA-Z0-9]*(@(?=.{1,31}$)[a-zA-Z]([a-zA-Z0-9_]*[a-zA-Z0-9])?)?$/,

            getMaxLength: getMaxLength
        };

        //
        // Public methods
        //

        /**
         * Provides maximum length of text that can be filled in input
         * @param {string} path - path to field
         * @returns {number}
         */
        function getMaxLength(path) {
            var lengths = {
                default: 128,
                cluster: {
                    description: 150
                },
                escalation: {
                    name: 40
                },
                'function': {
                    name: 63
                },
                group: {
                    description: 128
                },
                interface: {
                    alias: 40
                },
                network: {
                    name: 30,
                    description: 150,
                    subnet: 30,
                    mask: 150,
                    tag: 10
                },
                node: {
                    description: 128
                },
                container: {
                    description: 150
                },
                storagePool: {
                    name: 30,
                    description: 150,
                    url: 100,
                    username: 30
                },
                user: {
                    firstName: 30,
                    lastName: 30,
                    username: 32
                },
                tenant: {
                    name: 31
                }
            };

            return lodash.get(lengths, path, lengths.default);
        }
    }
}());
