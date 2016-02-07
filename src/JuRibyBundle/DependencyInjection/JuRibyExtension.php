<?php

namespace JuRibyBundle\DependencyInjection;

use JuRibyBundle\DependencyInjection\Configuration\ProjectsConfiguration;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class JuRibyExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new ProjectsConfiguration();
        $configs = $this->processConfiguration($configuration, $configs);

        $container->setParameter('ju_riby.projects', $configs['projects']);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yml');
    }
}
