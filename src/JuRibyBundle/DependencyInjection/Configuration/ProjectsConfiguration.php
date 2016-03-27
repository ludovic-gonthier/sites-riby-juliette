<?php

namespace JuRibyBundle\DependencyInjection\Configuration;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class ProjectsConfiguration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $tree = new TreeBuilder();
        $tree->root('ju_riby')
            ->children()
                ->arrayNode('projects')
                    ->prototype('array')
                        ->children()
                            ->scalarNode('name')->end()
                            ->scalarNode('description')->end()
                            ->scalarNode('year')->end()
                            ->scalarNode('text')->end()
                            ->scalarNode('number')->end()
                            ->arrayNode('visuals')
                                ->prototype('array')
                                    ->children()
                                        ->scalarNode('type')->end()
                                        ->scalarNode('source')->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ->end();

        return $tree;
    }
}
